import { StaticRoute } from '@zengenti/contensis-react-base';
import { CorePages, HomePage, SearchPage } from '~/dynamic/pages';

const injectSearch = async () => {
  const { reducer: SearchReducer, sagas: SearchSagas } = await import(
    /* webpackChunkName: "search-package" */
    '@zengenti/contensis-react-base/search'
  );
  const { config } = await import(
    /* webpackChunkName: "search-config" */
    '~/features/search'
  );

  return {
    key: 'search',
    reducer: SearchReducer(config),
    saga: SearchSagas,
  };
};

const staticRoutes: StaticRoute[] = [
  {
    path: '/',
    exact: true,
    component: HomePage,
    ssr: false,
  },
  {
    path: '/search/:facet?',
    exact: false,
    component: SearchPage,
    // Dynamically load search package and search config into redux
    injectRedux: injectSearch,
  },
  // ********************************
  // ˅˅ Do not delete these routes ˅˅
  {
    path: '/404',
    component: CorePages[404],
  },
  {
    path: '/zenInfo',
    ssrOnly: true,
    component: CorePages.ZenInfo,
  },
  // ˄˄ Do not delete these routes ˄˄
  // ********************************
];

export default staticRoutes;
