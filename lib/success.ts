import { Version3, Version3Client } from 'jira.js';
import { Sprint } from 'jira.js/out/agile/models';
import { CreateVersion } from 'jira.js/out/version3/parameters';
import * as _ from 'lodash';
import pLimit from 'p-limit';

import { makeAgileClient, makeVersion3Client } from './jira';
import { DEFAULT_RELEASE_DESCRIPTION_TEMPLATE, DEFAULT_VERSION_TEMPLATE, GenerateNotesContext, PluginConfig } from './types';
import { escapeRegExp } from './util';

export function getTickets(config: PluginConfig, context: GenerateNotesContext): string[] {
  let patterns: RegExp[] = [];

  if (config.ticketRegex !== undefined) {
    patterns = [new RegExp(config.ticketRegex, 'giu')];
  } else {
    patterns = config.ticketPrefixes!
        .map(prefix => new RegExp(`\\b${escapeRegExp(prefix)}-(\\d+)\\b`, 'giu'));
  }

  const tickets = new Set<string>();
  for (const commit of context.commits) {
    for (const pattern of patterns) {
      const matches = commit.message.match(pattern);
      if (matches) {
        matches.forEach(match => {
          tickets.add(match);
          context.logger.info(`Found ticket ${matches} in commit: ${commit.commit.short}`);
        });
      }
    }
  }

  return [...tickets];
}

async function findOrCreateVersion(
    config: PluginConfig,
    context: GenerateNotesContext,
    jira: Version3Client,
    project: Version3.Version3Models.Project,
    name: string,
    description: string,
    activeSprint: Sprint | undefined): Promise<Version3.Version3Models.Version> {
  const remoteVersions = project.versions;
  context.logger.info(`Looking for version with name '${name}'`);
  const existing = _.find(remoteVersions, { name });
  if (existing) {
    context.logger.info(`Found existing release '${existing.id}'`);
    return existing;
  }

  context.logger.info(`No existing release found, creating new`);

  let newVersion: Version3.Version3Models.Version;
  if (config.dryRun) {
    context.logger.info(`dry-run: making a fake release`);
    newVersion = {
      name,
      id: 'dry_run_id',
    } as any;
  } else {
    const descriptionText = description || '';
    const released = typeof context.branch !== 'string' ? !context.branch.prerelease : false;
    const parameters: CreateVersion = {
      name,
      projectId: project.id as any,
      description: descriptionText,
      startDate: activeSprint?.startDate,
      released: Boolean(config.released ?? released),
      releaseDate: config.setReleaseDate ? (new Date().toISOString()) : undefined,
    };
    newVersion = await jira.projectVersions.createVersion(parameters);
  }

  context.logger.info(`Made new release '${newVersion.id}'`);
  return newVersion;
}

async function editIssueFixVersions(config: PluginConfig, context: GenerateNotesContext, jira: Version3Client, newVersionName: string, releaseVersionId: string | undefined, issueKey: string): Promise<void> {
  try {
    context.logger.info(`Adding issue ${issueKey} to '${newVersionName}'`);
    if (!config.dryRun) {
      await jira.issues.editIssue({
        issueIdOrKey: issueKey,
        update: {
          fixVersions: [{
            add: { id: releaseVersionId },
          }],
        },
        properties: undefined as any,
      });
    }
  } catch (err: any) {
    const allowedStatusCodes = [400, 404];
    let { statusCode } = err;
    if (typeof err === 'string') {
      try {
        err = JSON.parse(err);
        statusCode = statusCode || err.statusCode;
      } catch (err) {
          // it's not json :shrug:
      }
    }
    if (allowedStatusCodes.indexOf(statusCode) === -1) {
      throw err;
    }
    context.logger.error(`Unable to update issue ${issueKey} statusCode: ${statusCode}`);
  }
}

export async function success(config: PluginConfig, context: GenerateNotesContext): Promise<void> {
  const isPrerelease = typeof context.branch !== 'string' && context.branch.prerelease;
  const runOnPrerelease = config.runOnPrerelease === undefined || config.runOnPrerelease;

  if (!isPrerelease || (isPrerelease && runOnPrerelease)) {
    const tickets = getTickets(config, context);

    context.logger.info(`Found ticket ${tickets.join(', ')}`);

    const versionTemplate = _.template(config.releaseNameTemplate ?? DEFAULT_VERSION_TEMPLATE);
    const newVersionName = versionTemplate({ version: context.nextRelease.version, env: context.env });

    const descriptionTemplate = _.template(config.releaseDescriptionTemplate ?? DEFAULT_RELEASE_DESCRIPTION_TEMPLATE);
    const newVersionDescription = descriptionTemplate({ version: context.nextRelease.version, notes: context.nextRelease.notes, env: context.env });

    context.logger.info(`Using jira release '${newVersionName}'`);

    const version3Client = makeVersion3Client(config, context);

    let activeSprint: Sprint | undefined;
    if (config.useBoardForActiveSprint) {
      const agileClient = makeAgileClient(config, context);
      const boards = await agileClient.board.getAllBoards({ projectKeyOrId: config.projectId });
      const board = boards.values.find(b => b.name === config.useBoardForActiveSprint);
      if (board) {
        const sprints = await agileClient.board.getAllSprints({ boardId: board.id });
        activeSprint = sprints.values.find(s => s.state === 'active');
        if (!activeSprint) {
          context.logger.error(`Board ${config.useBoardForActiveSprint} has no active sprint`);
        }
      } else {
        context.logger.error(`Board ${config.useBoardForActiveSprint} could not be found`);
      }
    }

    const project = await version3Client.projects.getProject({ projectIdOrKey: config.projectId });
    const releaseVersion = await findOrCreateVersion(config, context, version3Client, project, newVersionName, newVersionDescription, activeSprint);

    const concurrentLimit = pLimit(config.networkConcurrency || 10);

    const edits = tickets.map(issueKey =>
      concurrentLimit(() =>
        editIssueFixVersions(config, context, version3Client, newVersionName, releaseVersion.id, issueKey),
      ),
    );

    await Promise.all(edits);
  } else {

    context.logger.info(`Configuration set to not run on prerelease branches`);
  }
}
