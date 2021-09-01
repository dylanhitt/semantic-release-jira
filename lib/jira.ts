import { Version3Client } from 'jira.js';

import { PluginConfig, PluginContext } from './types';

export function makeClient(config: PluginConfig, context: PluginContext): Version3Client {
  const clientOptions = {
    host: config.jiraHost,
  };
  return new Version3Client(clientOptions);
}
