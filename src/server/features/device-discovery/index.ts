import SSDP from './ssdp';

export const getDevices = async () => {
  const ssdp = new SSDP();
  const devices = await ssdp.search(
    'urn:schemas-upnp-org:device:MediaServer:1'
  );

  return devices;
};
