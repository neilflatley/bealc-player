import { call } from 'redux-saga/effects';
import { RouteLoadOptions, WithEvents } from '@zengenti/contensis-react-base';
import { SearchTransformations } from '@zengenti/contensis-react-base/search';

import { queryParams, routeParams } from '../util/navigation';
import { ContentTypes, ListingPages } from '../schema';

export default {
  onRouteLoad: function* onRouteLoad() {
    // Set params for routing saga
    const routeLoadOptions: RouteLoadOptions = {
      customNavigation: {
        ancestors: false,
        children: false,
        siblings: false,
        tree: true,
      },
    };
    return yield routeLoadOptions;
  },
  onRouteLoaded: function* onRouteLoaded({
    path,
    entry,
    location,
    staticRoute,
  }) {
    const params = {
      ...routeParams(staticRoute),
      ...queryParams(location && location.search),
    };

    const contentTypeId = entry?.sys?.contentTypeId;
    let triggerListing = false;
    // To give the Content Type pages with Listings
    // the right parameters to drive them
    switch (contentTypeId) {
      case ContentTypes.listingPage:
        params.category = entry?.sys?.id;
        triggerListing = true;
        break;
      default:
        break;
    }

    if (
      path.startsWith('/search') ||
      (triggerListing && Object.keys(ListingPages).includes(contentTypeId))
    ) {
      const { setRouteFilters } = (yield import(
        /* webpackChunkName: "search-package" */
        '@zengenti/contensis-react-base/search'
      )) as typeof import('@zengenti/contensis-react-base/search');

      const transformations = (
        (yield import(
          /* webpackChunkName: "search-mappers" */
          '~/features/search/transformations'
        )) as any
      ).default as SearchTransformations;

      yield call(setRouteFilters, {
        listingType: triggerListing ? ListingPages[contentTypeId] : undefined,
        mappers: transformations,
        params,
      });
    }
  },
} as WithEvents;
