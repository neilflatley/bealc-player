// import loadable from './loadable';
import loadable from '@loadable/component';

// Component exports
// export const Composer = loadable(
//   () =>
//     import(
//       /* webpackChunkName: "composer-wrapper" */ '~/components/composer/ComposerWrapper'
//     )
// );

export const CoreComponents = {
  ZenInfo: loadable(
    () =>
      import(
        /* webpackChunkName: "zeninfo.component" */ '@zengenti/contensis-react-base/util'
      ),
    { resolveComponent: (module: any) => module.VersionInfo }
  ),
};
