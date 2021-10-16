// Import feature sagas to be included with application startup

import { browseSagas } from '~/features/browser/redux/sagas';
import { discoverySagas } from '~/features/device-discovery/redux/sagas';
import { plexSagas } from '~/features/plex/redux/sagas';

const featureSagas = [...browseSagas, ...discoverySagas, ...plexSagas] as any[];

export default featureSagas;
