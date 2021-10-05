import {
  SearchConfig,
  SearchFacet,
  SearchFilters as Filters,
  Listing,
} from '@zengenti/contensis-react-base/search';

import {
  BaseFields,
  ArticleFields,
  SearchFilters,
  Fields,
  ContentTypes,
  Listings,
  SearchFacets,
  Minilists,
} from '~/core/schema';

import * as WeightedFields from './weightedFields.config';

const orderBy = [`-${Fields.publishedDate}`, Fields.entryTitle];

const searchFilter: Filters = {
  [SearchFilters.category]: {
    title: 'Category',
    fieldId: Fields.categoryId,
    contentTypeId: [ContentTypes.category],
    items: [],
    isSingleSelect: false,
    isGrouped: true,
  },
};

export default {
  tabs: [{ id: 0, label: '' }],
  facets: {
    all: {
      title: 'All results',
      queryParams: {
        contentTypeIds: [ContentTypes.article, ContentTypes.blog],
        fields: [...BaseFields, ...ArticleFields],
        linkDepth: 0,
        orderBy,
        pageSize: 9,
        weightedSearchFields: [...WeightedFields.base],
      },
      filters: searchFilter,
    },
  } as { [key in keyof typeof SearchFacets]: SearchFacet },
  listings: {
    categoryArticles: {
      title: 'Articles by category',
      queryParams: {
        contentTypeIds: ['article'],
        customWhere: [{ field: 'sys.uri', exists: true }],
        fields: [],
        linkDepth: 2,
        orderBy,
        pageSize: 9,
      },
      filters: searchFilter,
    },
  } as { [key in keyof typeof Listings]: Listing },
  minilist: {
    relatedContent: {
      title: 'Related content',
      queryParams: {
        contentTypeIds: ['pot'],
        fields: [...BaseFields],
        linkDepth: 0,
        orderBy,
        pageSize: 3,
      },
    },
    // latestArticles: {
    //   title: 'Latest Articles',
    //   projectId: 'projectId',
    //   queryParams: {
    //     contentTypeIds: ['article'],
    //     fields: [...BaseFields, ...ArticleFields],
    //     orderBy: ['-sys.version.published'],
    //     pageSize: 4,
    //     customWhere: [
    //       {
    //         not: {
    //           field: 'featured',
    //           equalTo: true,
    //         },
    //       },
    //     ],
    //   },
    // },
  } as { [key in keyof typeof Minilists]: Listing },
} as SearchConfig;
