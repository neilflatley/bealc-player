import { produce, Draft } from 'immer';
import merge from 'deepmerge';
import {
  BROWSED_CONTENT,
  FIND_MEDIA_SERVERS,
  FOUND_MEDIA_SERVERS,
  PLEX_SIGN_OUT,
  SELECT_PLEX_SERVER,
} from './types';
import mapJson from 'jsonpath-mapper';
import { plexItemMapping } from '../mappings';
import { findContent } from '~/features/browser/redux/reducer';
import { arrayMerge } from '~/utils';

const initialState = {
  devices: [],
  servers: {
    accessToken: null,
    error: null,
    loading: false,
  },
};

export default produce((state: Draft<any>, action) => {
  switch (action.type) {
    case PLEX_SIGN_OUT: {
      state.devices = [];
      return;
    }
    case FIND_MEDIA_SERVERS:
      state.servers.loading = true;
      return;

    case FOUND_MEDIA_SERVERS: {
      if (action?.servers?.devices)
        state.devices = merge(state.devices, action.servers.devices, {
          arrayMerge,
        });
      else state.error = action?.error;
      state.servers.loading = false;
      return;
    }
    case SELECT_PLEX_SERVER: {
      state.devices = state.devices.map((d, i) => ({
        ...d,
        isSelected: i === action.pos,
      }));
      return;
    }
    case BROWSED_CONTENT: {
      const selectedDevice = state.devices.find(d => d.isSelected);
      if (action.browsed.error) selectedDevice.error = action.browsed.error;
      else {
        if (!action.path || action.path === '/')
          selectedDevice.content = action.browsed.data;
        else {
          const container = findContent(selectedDevice.content, action.path);
          if (container.type !== 'item')
            container.children = merge(
              container.children,
              action.browsed.data?.map(i => ({
                ...i,
                ...mapJson({ ...i, selectedDevice }, plexItemMapping),
              })) || [],
              {
                arrayMerge,
              }
            );
        }
      }
      return;
    }
    default:
      return;
  }
}, initialState);
