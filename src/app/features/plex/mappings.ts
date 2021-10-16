import humanizeDuration from 'humanize-duration';

const viaProxy = (url: string) =>
  `/devices/proxy?url=${encodeURIComponent(url)}`;

const baseUrl = (device: any, local = 'remote') => {
  if (local === 'local') return `http://${device.localAddresses}:32400`;
  else return `${device.scheme}://${device.host}:${device.port}`;
};

export const plexItemMapping = {
  canPlay: ({ type }) => ['album', 'episode', 'movie', 'track'].includes(type),
  imageUri: ({ selectedDevice }, item) => {
    if (!selectedDevice || !item.art) return;
    return viaProxy(
      baseUrl(selectedDevice, item.local) +
        item.art +
        `?X-Plex-Token=${selectedDevice?.accessToken}`
    );
  },
  thumbUri: ({ selectedDevice }, item) => {
    if (!selectedDevice || !item.thumb) return;
    return viaProxy(
      baseUrl(selectedDevice, item.local) +
        item.thumb +
        `?X-Plex-Token=${selectedDevice?.accessToken}`
    );
  },
  mediaUri: ({ selectedDevice }, item) => {
    if (!selectedDevice || !item?.Media) return;
    return viaProxy(
      baseUrl(selectedDevice, item.local) +
        item.Media[0].Part[0].key +
        `?X-Plex-Token=${selectedDevice?.accessToken}`
    );
  },
  title: 'title',
  artist: 'grandparentTitle',
  album: 'parentTitle',
  summary: ['originalTitle', 'summary'],
  year: ['year', 'parentYear'],
  duration: {
    $path: ['duration'],
    $formatting: d =>
      humanizeDuration(d, {
        largest: 2,
        round: true,
        conjunction: ' ',
        serialComma: false,
      }),
  },
  type: 'type',
  local: 'local',
  format: ['Media[0].Part[0].container', 'Media[0].container'],
  videoCodec: 'Media[0].videoCodec',
  audioCodec: 'Media[0].audioCodec',
  width: 'Media[0].width',
  height: 'Media[0].height',
};

const album = 'raw.upnp:album[0]';

export const dlnaItemMapping = {
  canPlay: {
    $path: album,
    $formatting: (album: string) => !!album,
  },
  imageUri: { $path: ['raw.upnp:icon[0]'], $formatting: viaProxy },
  thumbUri: {
    $path: [
      'raw.upnp:albumArtURI[0]._',
      "raw.res[?(@['$'].protocolInfo.match(/image/))]._",
    ],
    $formatting: viaProxy,
    $return: (uri: string | string[]) => (Array.isArray(uri) ? uri[0] : uri),
  },
  mediaUri: { $path: 'res', $formatting: viaProxy },
  title: 'title',
  artist: 'raw.upnp:artist[0]',
  album,
  summary: ['raw.upnp:longDescription[0]'],
  year: { $path: 'raw.dc:date[0]', $formatting: (d = '') => d.substring(0, 4) },
  duration: {
    $path: ['raw.res[0].$.duration'],
    $formatting: (d = '') => d.split('.').shift(),
  },
  type: 'type',
  local: () => 'local',
  format: {
    $path: ['raw.res[0]._'],
    $formatting: (uri = '') => uri.split('.')?.pop(),
    // uri
    //   .split(',')
    //   .filter(q => q.startsWith('ext='))?.[0]
    //   ?.replace('ext=.', ''),
  },
  videoCodec: () => '?',
  audioCodec: () => '?',
  width: {
    $path: 'raw.res[0].$.resolution',
    $formatting: (res = '0x0') => res.split('x')[0],
  },
  height: {
    $path: 'raw.res[0].$.resolution',
    $formatting: (res = '0x0') => res.split('x')[1],
  },
};
