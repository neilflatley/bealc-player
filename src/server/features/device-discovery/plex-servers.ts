import { PlexAPIClient } from 'plex-wrapper';
import packagejson from '-/package.json';

export const clientId = '3a0b8c77-8112-460f-add2-bb7cea9fb931';

let client: PlexAPIClient;

const plex = {
  accessToken: () => client?.accessToken,
  client: (accessToken = '', username = '', password = '') => {
    client = new PlexAPIClient(clientId, username, password, {
      title: 'BeaLC Player',
      version: packagejson.version,
      description: 'A DLNA and Plex client',
    });
    if (accessToken) client.accessToken = accessToken;
    return client;
  },
  getServers: async () => {
    const servers = await client.getServers();
    // The result contains a JSON array with all the servers
    return servers;
  },
};

export default plex;
