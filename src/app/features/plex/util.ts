import Cookies from 'js-cookie';

export const completeApiPath = (path: string) =>
  path.startsWith('/library')
    ? path
    : `/library/sections${path !== '/' ? path : ''}`;

export const getPlexServersCookie = () => {
  const plex_servers = Cookies.get('plex_servers');
  return JSON.parse(plex_servers?.replace('j:', '') || '{}');
};
export const destroyPlexServersCookie = () => {
  Cookies.remove('plex_servers');
};
