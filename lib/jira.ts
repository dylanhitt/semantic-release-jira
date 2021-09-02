import { Config, Version3Client } from 'jira.js';

import { PluginConfig, PluginContext } from './types';

export function makeClient(config: PluginConfig, context: PluginContext): Version3Client {
  const clientOptions: Config = {
    host: config.jiraHost,
  };

  if (context.env.JIRA_USERNAME && context.env.JIRA_PASSWORD) {
    clientOptions.authentication = {
      basic: {
        username: context.env.USERNAME,
        password: context.env.PASSWORD,
      },
    };
  }

  if (context.env.JIRA_EMAIL && context.env.JIRA_API_TOKEN) {
    clientOptions.authentication = {
      basic: {
        email: context.env.JIRA_EMAIL,
        apiToken: context.env.JIRA_API_TOKEN,
      },
    };
  }

  // This is for backwards compatibility
  if (context.env.JIRA_AUTH) {
    const decoded = Buffer.from(context.env.JIRA_AUTH, 'base64').toString('utf-8');
    const username = decoded.split(':')[0];
    const password = decoded.split(':')[1];
    clientOptions.authentication = {
      basic: {
        username,
        password,
      },
    };
  }

  return new Version3Client(clientOptions);
}
