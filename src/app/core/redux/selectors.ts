import {
  navigation,
  routing,
  version,
} from '@zengenti/contensis-react-base/redux';

export const {
  hasNavigationTree,
  selectNavigationRoot,
  selectNavigationDepends,
} = navigation.selectors;

export const {
  selectBreadcrumb,
  selectCurrentAncestors,
  selectCurrentChildren,
  selectCurrentHash,
  selectCurrentHostname,
  selectCurrentNode,
  selectCurrentPath,
  selectCurrentProject,
  selectCurrentSearch,
  selectCurrentSiblings,
  selectMappedEntry,
  selectIsNotFound,
  selectQueryStringAsObject,
  selectRouteEntry,
  selectRouteEntryContentTypeId,
  selectRouteEntryEntryId,
  selectRouteEntryID,
  selectRouteEntryLanguage,
  selectRouteEntrySlug,
  selectRouteErrorMessage,
  selectRouteIsError,
  selectRouteLoading,
  selectRouteStatusCode,
} = routing.selectors;

export const { selectCommitRef, selectBuildNumber, selectVersionStatus } =
  version.selectors;
