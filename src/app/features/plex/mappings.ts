import humanizeDuration from 'humanize-duration';

const viaProxy = (url: string) =>
  `/devices/proxy?url=${encodeURIComponent(url)}`;

const baseUrl = (device: any, local = 'remote') => {
  if (local === 'local') return `http://${device.localAddresses}:32400`;
  else return `${device.scheme}://${device.host}:${device.port}`;
};

export const plexItemMapping = {
  imageUri: ({ selectedDevice }, item) => {
    if (!selectedDevice || !item?.Media || !item.art) return;
    return viaProxy(
      baseUrl(selectedDevice, item.local) +
        item.art +
        `?X-Plex-Token=${selectedDevice?.accessToken}`
    );
  },
  thumbUri: ({ selectedDevice }, item) => {
    if (!selectedDevice || !item?.Media || !item.thumb) return;
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
};

export const dlnaItemMapping = {
  imageUri: { $path: ['raw.upnp:icon'], $formatting: viaProxy },
  thumbUri: { $path: ['raw.upnp:albumArtURI[0]._'], $formatting: viaProxy },
  mediaUri: { $path: 'res', $formatting: viaProxy },
  title: 'title',
  artist: 'raw.upnp:artist[0]',
  album: 'raw.upnp:album[0]',
  summary: ['raw.upnp:longDescription'],
  year: { $path: 'raw.dc:date[0]', $formatting: (d = '') => d.substring(0, 4) },
  duration: {
    $path: ['raw.res[0].$.duration'],
    $formatting: (d = '') => d.split('.').shift(),
  },
  type: 'type',
  local: () => 'local',
};
