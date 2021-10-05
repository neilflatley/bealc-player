import { Express } from 'express';
import { getDevices } from './device-discovery';
import browseServer from './device-discovery/dlna-browser';
import { default as fetch } from 'node-fetch';
import plex from './device-discovery/plex-servers';
import cookieParser from 'cookie-parser';
import PlexApi from 'plex-api';

globalThis.fetch = fetch;

const middleware = (app: Express) => {
  app.use(cookieParser());

  app.get('/devices/find', async (req, res) => {
    const devices = (await getDevices()) as any[];
    const discoveredDevices = [];

    for (const { server, LOCATION, ...headers } of devices) {
      const device = server.device[0];
      let name = '';
      let controlUrl = '';

      if (device) {
        name = device.friendlyName.toString();
        console.log(`Found: ${JSON.stringify(name)}`);
        const services = Array.isArray(device.serviceList[0].service)
          ? device.serviceList[0].service
          : [];

        for (const service of services) {
          if (
            service.serviceType[0] ===
            'urn:schemas-upnp-org:service:ContentDirectory:1'
          ) {
            const requestUrl = new URL(LOCATION);
            controlUrl =
              'http://' +
              requestUrl.hostname +
              ':' +
              requestUrl.port +
              service.controlURL[0];
          }
        }
      }
      discoveredDevices.push({
        name,
        controlUrl,
        headers: { LOCATION, ...headers },
        raw: server,
      });
    }
    res.send(discoveredDevices);
  });

  app.get('/devices/browse', async (req, res) => {
    const { id, url } = req.query;
    const controlUrl = decodeURIComponent(url as string);
    browseServer(id, controlUrl, {}, (err, browsed) => {
      if (err) res.status(500);
      res.send(err || browsed);
    });
  });

  app.get('/devices/proxy', async (req, res) => {
    const { url } = req.query;
    const response = await fetch(decodeURIComponent(url as string));
    const body = await response.text();
    res.setHeader(
      'content-type',
      response.headers.get('content-type') as string
    );
    res.send(body);
  });

  app.get('/devices/plex/servers', async (req, res) => {
    const cookieName = 'plex_servers';
    const cookie = req.cookies[cookieName];
    const { accessToken = cookie?.accessToken, u, p } = req.query;
    try {
      if (!accessToken && (!u || !p)) throw new Error('Missing credentials');
      const servers = await plex.client(accessToken, u, p).getServers();
      const response = { accessToken: plex.accessToken(), servers };
      res.cookie(cookieName, response, { maxAge: 24 * 60 * 60 * 1000 });
      res.send(response);
    } catch (ex) {
      console.error(ex);
      res.clearCookie(cookieName);
      res.status(500);
      res.send(ex.toString());
    }
  });

  app.get('/devices/plex/:machineIdentifier/browse', async (req, res) => {
    const cookieName = 'plex_servers';
    const cookie = req.cookies[cookieName];
    const { path } = req.query;
    const { machineIdentifier } = req.params;

    const isLocal = req.socket.localAddress === req.socket.remoteAddress;
    console.info(`[plex] Request for: ${path}`);
    console.info('localAddress', req.socket.localAddress);
    console.info('remoteAddress', req.socket.localAddress);
    console.info('isLocal', isLocal);

    const server = cookie.servers.find(
      s => s.machineIdentifier === machineIdentifier
    );
    try {
      const { scheme, host, localAddresses, port, accessToken } = server;
      const remoteClient = new PlexApi({
        https: scheme === 'https',
        hostname: host,
        port: Number(port),
        token: accessToken,
      });
      const localClient = new PlexApi({
        hostname: localAddresses,
        token: accessToken,
      });
      remoteClient
        .query(decodeURIComponent(path))
        .then(response => res.send({ ...response, local: 'remote' }))
        .catch(ex => {
          res.status(500);
          if (!res.headersSent) res.send(ex.toString());
        });
      localClient
        .query(decodeURIComponent(path))
        .then(response =>
          res.send({ ...response, local: isLocal ? 'local' : 'remote' })
        )
        .catch(ex => {
          res.status(500);
          if (!res.headersSent) res.send(ex.toString());
        });
    } catch (ex) {
      console.error(ex);
      res.status(500);
      res.send(ex.toString());
    }
  });
};

export default middleware;
