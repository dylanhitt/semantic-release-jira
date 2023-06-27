/* eslint-disable @typescript-eslint/no-throw-literal */
import SemanticReleaseError from '@semantic-release/error'

import { makeVersion3Client } from './jira'
import type { PluginConfig, PluginContext } from './types'

export async function verifyConditions (config: PluginConfig, context: PluginContext): Promise<void> {
  const { networkConcurrency } = config

  if (typeof config.jiraHost !== 'string') {
    throw new SemanticReleaseError('config.jiraHost must be a string')
  }
  if (typeof config.projectId !== 'string') {
    throw new SemanticReleaseError('config.projectId must be a string')
  }

  if ((config.ticketPrefixes == null) && (config.ticketRegex == null)) {
    throw new SemanticReleaseError('Either config.ticketPrefixes or config.ticketRegex must be passed')
  }

  if ((config.ticketPrefixes != null) && (config.ticketRegex != null)) {
    throw new SemanticReleaseError('config.ticketPrefixes and config.ticketRegex cannot be passed at the same time')
  }

  if (config.ticketPrefixes != null) {
    if (!Array.isArray(config.ticketPrefixes)) {
      throw new SemanticReleaseError('config.ticketPrefixes must be an array of string')
    }
    for (const prefix of config.ticketPrefixes) {
      if (typeof prefix !== 'string') {
        throw new SemanticReleaseError('config.ticketPrefixes must be an array of string')
      }
    }
  }

  if ((config.ticketRegex != null) && typeof config.ticketRegex !== 'string') {
    throw new SemanticReleaseError('config.ticketRegex must be an string')
  }

  if (config.releaseNameTemplate != null) {
    if (typeof config.releaseNameTemplate !== 'string' || Array.isArray(config.releaseNameTemplate)) {
      throw new SemanticReleaseError('config.releaseNameTemplate must be a string or a list of strings')
    }
  }

  if (config.releaseDescriptionTemplate != null) {
    if (typeof config.releaseDescriptionTemplate !== 'string') {
      throw new SemanticReleaseError('config.releaseDescriptionTemplate must be a string')
    }
  }

  if (config.useBoardForActiveSprint != null) {
    if (typeof config.useBoardForActiveSprint !== 'string') {
      throw new SemanticReleaseError('config.useBoardForActiveSprint must be a string')
    }
  }

  if ((networkConcurrency != null) && (typeof networkConcurrency !== 'number' || networkConcurrency < 1)) {
    throw new SemanticReleaseError('config.networkConcurrency must be an number greater than 0')
  }

  if ((context.env.JIRA_USERNAME === '') && (context.env.JIRA_PASSWORD === '') && (context.env.JIRA_EMAIL === '') && (context.env.JIRA_API_TOKEN === '') && (context.env.JIRA_AUTH === '')) {
    throw new SemanticReleaseError('Either JIRA_USERNAME and JIRA_PASSWORD or JIRA_EMAIL and JIRA_API_TOKEN must be set for basic auth')
  }

  if (((context.env.JIRA_USERNAME === '') && (context.env.JIRA_PASSWORD !== '')) || ((context.env.JIRA_USERNAME !== '') && (context.env.JIRA_PASSWORD === ''))) {
    throw new SemanticReleaseError('Both JIRA_USERNAME and JIRA_PASSWORD must be set for basic auth')
  }

  if (((context.env.JIRA_EMAIL === '') && (context.env.JIRA_API_TOKEN !== '')) || ((context.env.JIRA_EMAIL !== '') && (context.env.JIRA_API_TOKEN === ''))) {
    throw new SemanticReleaseError('Both JIRA_EMAIL and JIRA_API_TOKEN must be set for basic auth')
  }

  const jira = makeVersion3Client(config, context)

  await jira.projects.getProject({ projectIdOrKey: config.projectId })
}
