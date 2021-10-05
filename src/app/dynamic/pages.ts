// import loadable from './loadable';
import loadable from '@loadable/component';

export const HomePage = loadable(
  () => import(/* webpackChunkName: "home.page" */ '~/pages/Home/home.page')
);
export const SearchPage = loadable(
  () =>
    import(/* webpackChunkName: "search.page" */ '~/pages/Search/search.page')
);
// ********************************
// ˅˅ Do not delete these pages ˅˅
export const CorePages = {
  404: loadable(
    () => import(/* webpackChunkName: "notfound" */ '~/pages/NotFound')
  ),
  ZenInfo: loadable(
    () =>
      import(/* webpackChunkName: "versioninfo.page" */ '~/pages/VersionInfo')
  ),
};
// ˄˄ Do not delete these pages ˄˄
// ********************************
