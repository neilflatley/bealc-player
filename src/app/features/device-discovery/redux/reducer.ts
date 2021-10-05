import { produce, Draft } from 'immer';
import merge from 'deepmerge';
import {
  BROWSED_CONTENT,
  FIND_MEDIA_SERVERS,
  FOUND_MEDIA_SERVERS,
  SELECT_CONTENT_NODE,
  SELECT_MEDIA_SERVER,
} from './types';
import mapJson from 'jsonpath-mapper';
import { dlnaItemMapping } from '~/features/plex/mappings';

const initialState = {
  devices: [],
  selectedItem: null,
  selectedNode: null,
  selectedServer: null,
  servers: {
    error: null,
    loading: false,
  },
};

export const findContent = (content, id) => {
  if (!content) return content;
  const c = content.find(c => c.id === id);
  if (c) return c;

  return content
    .map(c => {
      if (Array.isArray(c.children)) return findContent(c.children, id);
    })
    .filter(c => c)?.[0];
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
    case SELECT_CONTENT_NODE: {
      const server = state.devices.find(d => d.isSelected);
      const contentNode = findContent(server.content, action.id);
      if (contentNode?.type === 'item') state.selectedItem = contentNode;
      else state.selectedNode = contentNode;
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
