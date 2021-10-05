import { SearchTransformations } from '@zengenti/contensis-react-base/search';
import mapEntriesToResults from './entry-to-cardprops.mapper';
import mapStateToResultsInformation from './state-to-resultsinformationprops.mapper';

export default {
  results: mapEntriesToResults,
  resultsInfo: mapStateToResultsInformation,
} as SearchTransformations;
