import { selectors } from '@zengenti/contensis-react-base/search';

import { default as mapJson } from '~/core/util/json-mapper';

const { getCurrent, getListing, getResults, getTotalCount, getPaging } =
  selectors.selectListing;

const listingTitle = (state: any) => {
  const listing = getListing(state);
  return listing?.title;
};

const totalCount = (state: any) => getTotalCount(state);

const searchSummaryTemplate = {
  currentListing: (state: any) => getCurrent(state),
  currentPageCount: (state: any) => getResults(state).length,
  listingTitle,
  noResultsText: (state: any) =>
    totalCount(state) === 0 ? `No results were found` : '',
  resultsText: (state: any) => {
    const paging = getPaging(state);
    const { pageIndex, pageSize, totalCount, pagesLoaded } = paging;
    if (!pagesLoaded) return null;
    const start = (pagesLoaded[0] || pageIndex) * pageSize + 1;
    let end = start + (pagesLoaded.length * pageSize || pageSize) - 1;
    if (end > totalCount) end = totalCount;

    return `${start} - ${end} of ${totalCount} results`;
  },
};

const mapStateToResultsInformation = (state: any) =>
  mapJson(state, searchSummaryTemplate);

export default mapStateToResultsInformation;
