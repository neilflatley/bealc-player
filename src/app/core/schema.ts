export const DataFormats = {
  entry: 'entry',
  webpage: 'webpage',
};

const sys = {
  contentTypeId: 'sys.contentTypeId',
  dataFormat: 'sys.dataFormat',
  filename: 'sys.properties.filename',
  id: 'sys.id',
  includeInSearch: 'sys.metadata.includeInSearch',
  slug: 'sys.slug',
  uri: 'sys.uri',
  versionStatus: 'sys.versionStatus',
  published: 'sys.version.published',
};

export const Fields = {
  categoryId: 'category.sys.id',
  contentTypeId: 'sys.contentTypeId',
  entryTitle: 'entryTitle',
  entryDescription: 'entryDescription',
  image: 'image',
  keywords: 'keywords',
  metaContent: 'metaContent',
  publishedDate: 'publishedDate',
  sys,
  wildcard: '*',
};

export const BaseFields = [
  Fields.entryTitle,
  Fields.entryDescription,
  Fields.sys.contentTypeId,
  Fields.sys.slug,
  Fields.sys.uri,
  Fields.sys.published,
];

export const ArticleFields = [Fields.image, Fields.categoryId];

export const Projects = {
  website: 'website',
};

export const VersionStatus = {
  published: 'published',
  latest: 'latest',
};

export const ContentTypes = {
  article: 'article',
  blog: 'blogPost',
  category: 'category',
  contentPage: 'contentPage',
  homePage: 'homepage',
  landingPage: 'landingPage',
  listingPage: 'listingPage',
  person: 'person',
};

export const WebpageFormats = {};

export const FilterExpressionTypes = {
  contentType: 'contentType',
  field: 'field',
};

export const CardTypes = {
  Event: 'Event',
  News: 'News',
  Profile: 'Profile',
  Webpage: 'Webpage',
};

export const Listings = {
  categoryArticles: 'categoryArticles',
  // events: 'events',
  // news: 'news',
};

export const Minilists = {
  latestArticles: 'latestArticles',
  relatedContent: 'relatedContent',
};

export const ListingPages = {
  [ContentTypes.category]: Listings.categoryArticles,
};

export const SearchFacets = {
  all: 'all',
  // news: 'news',
  // pages: 'pages',
};

export const SearchFilters = {
  // Insert filters here
  category: 'category',
};

export const FreeTextWeights = {
  title: 100,
  description: 50,
  keywords: 50,
  content: 10,
};

export const RoutingFields = [
  Fields.sys.contentTypeId,
  Fields.sys.slug,
  Fields.sys.uri,
  Fields.entryTitle,
];

export const ComposerComponents = {
  // Insert composer components
};
