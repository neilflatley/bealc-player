import { Express } from 'express';
import { getDevices } from './device-discovery';
import browseServer from './device-discovery/dlna-browser';
import { default as fetch } from 'node-fetch';
import plex, { clientId } from './device-discovery/plex-servers';
import cookieParser from 'cookie-parser';
import PlexApi from 'plex-api';
import httpProxy from 'http-proxy';
import os from 'os';
import packagejson from '-/package.json';

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

  const devicesProxy = httpProxy.createProxyServer();
  app.get('/devices/proxy', async (req, res) => {
    const { url } = req.query;
    req.url = decodeURIComponent(url as string);
    const pathArray = req.url.split('/');
    const protocol = pathArray[0];
    const host = pathArray[2];
    const baseUrl = protocol + '//' + host;

    console.info(
      `Proxying request from '${req.socket.remoteAddress}' to ${url} at host '${baseUrl}'`
    );
    return devicesProxy.web(req, res, {
      target: baseUrl,
    });
  });

  app.get('/devices/plex/servers', async (req, res) => {
    const cookieName = 'plex_servers';
    const cookie = req.cookies[cookieName];
    const { accessToken = cookie?.accessToken, u, p } = req.query;

    try {
      if (!accessToken && (!u || !p)) throw new Error('Missing credentials');
      const client = await plex.client(accessToken, u, p);
      process.on('unhandledRejection', e => {
        console.error(e, '\n[server] unhandledRejection ...');
        if (!res.headersSent) {
          res.clearCookie(cookieName);
          res.status(500);
          res.send(e.toString());
        }
      });
      const servers = await client?.getServers();
      const response = { accessToken: plex.accessToken(), servers };
      res.cookie(cookieName, response, { maxAge: 240 * 60 * 60 * 1000 });
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

    const isLocal =
      req.socket.localAddress.split(':').pop()?.split('.').shift() ===
      req.socket.remoteAddress?.split(':').pop()?.split('.').shift();
    console.info(`[plex] Request for: '${path}''`);
    console.info('remoteAddress:', req.socket.remoteAddress);
    console.info('isLocal', isLocal);

    const server = cookie.servers.find(
      s => s.machineIdentifier === machineIdentifier
    );
    try {
      const { scheme, host, localAddresses, port, accessToken } = server;
      const options = {
        identifier: clientId,
        product: 'BeaLC Player',
        version: packagejson.version,
        deviceName: os.hostname(),
      };
      const remoteClient = new PlexApi({
        https: scheme === 'https',
        hostname: host,
        port: Number(port),
        token: accessToken,
        options,
      });
      const localClient = new PlexApi({
        hostname: localAddresses,
        token: accessToken,
        options,
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
        .then(response => res.send({ ...response, local: 'local' }))
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
