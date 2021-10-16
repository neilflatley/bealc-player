import { produce, Draft } from 'immer';
import merge from 'deepmerge';
import {
  BROWSED_CONTENT,
  FIND_MEDIA_SERVERS,
  FOUND_MEDIA_SERVERS,
  SELECT_MEDIA_SERVER,
} from './types';
import mapJson from 'jsonpath-mapper';
import { dlnaItemMapping } from '~/features/plex/mappings';
import { findContent } from '~/features/browser/redux/reducer';

const initialState = {
  devices: [],
  selectedServer: null,
  servers: {
    error: null,
    loading: false,
  },
};

const arrayMerge = (_, sourceArray) => sourceArray;

export default produce((state: Draft<any>, action) => {
  switch (action.type) {
    case FIND_MEDIA_SERVERS:
      state.servers.loading = true;
      return;

    case FOUND_MEDIA_SERVERS: {
      state.devices = merge(state.devices, action.servers.devices, {
        arrayMerge,
      });
      state.servers.loading = false;
      return;
    }
    case SELECT_MEDIA_SERVER: {
      state.selectedServer = state.devices[action.pos].name;
      state.devices = state.devices.map((d, i) => ({
        ...d,
        isSelected: i === action.pos,
      }));
      return;
    }
    case BROWSED_CONTENT: {
      const selectedDevice = state.devices.find(d => d.isSelected);

      if (action.id === 0) selectedDevice.content = action.browsed.container;
      else {
        const container = findContent(selectedDevice.content, action.id);
        if (container.type !== 'item')
          container.children = merge(
            container.children,
            (action.browsed.container || action.browsed.item || []).map(i => ({
              ...i,
              ...mapJson({ ...i, selectedDevice }, dlnaItemMapping),
            })),
            {
              arrayMerge,
            }
          );
      }
      return;
    }
    default:
      return;
  }
}, initialState);
