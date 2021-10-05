// import loadable from './loadable';
import loadable from '@loadable/component';

export const Link = loadable(
  () =>
    import(
      /* webpackChunkName: "example-composer-item" */ '~/features/link/Link'
    )
);
