// Import feature sagas to be included with application startup

import { discoverySagas } from '~/features/device-discovery/redux/sagas';
import { plexSagas } from '~/features/plex/redux/sagas';

const featureSagas = [...discoverySagas, ...plexSagas] as any[];

export default featureSagas;
