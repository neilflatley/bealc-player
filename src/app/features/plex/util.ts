export const completeApiPath = (path: string) =>
  path.startsWith('/library')
    ? path
    : `/library/sections${path !== '/' ? path : ''}`;
