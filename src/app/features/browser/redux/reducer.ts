import { produce, Draft } from 'immer';
import merge from 'deepmerge';
import {
  HIDE_BROWSER,
  BROWSED_CONTENT,
  SELECT_CONTENT_NODE,
  SET_MEDIA_SERVER,
  SET_DEVICE_TYPE,
  SHOW_BROWSER,
} from './types';
import mapJson from 'jsonpath-mapper';
import { dlnaItemMapping, plexItemMapping } from '~/features/plex/mappings';

const initialState = {
  deviceType: 'dlna',
  autoPlay: false,
  selectedItem: null,
  selectedNode: null,
  selectedServer: null,
  visible: true,
};

export const findContent = (content, id) => {
  if (!id) return null;
  if (!content || typeof content !== 'object') return content;
  const c = content.find(
    c => c.id === id || c.path + '/' + c.key === id || c.key === id
  );
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
    case SET_DEVICE_TYPE: {
      state.deviceType = action.deviceType;
      return;
    }
    case SET_MEDIA_SERVER: {
      state.selectedServer = action.selectedServer;
      return;
    }
    case SELECT_CONTENT_NODE: {
      const server = action.selectedDevice;
      const contentNode = findContent(server.content, action.path);
      if (
        action.deviceType === 'plex' &&
        ['episode', 'movie', 'track'].includes(contentNode?.type) &&
        contentNode?.Media
      )
        state.selectedItem = contentNode;
      else if (action.deviceType === 'dlna' && contentNode?.type === 'item')
        state.selectedItem = contentNode;
      else state.selectedNode = contentNode;

      state.autoPlay = action.autoPlay;
      return;
    }
    case BROWSED_CONTENT: {
      const selectedDevice = action.selectedDevice;

      if (action.deviceType === 'dlna') {
        if (action.id === 0) selectedDevice.content = action.browsed.container;
        else {
          const container = findContent(selectedDevice.content, action.id);
          if (container.type !== 'item')
            container.children = merge(
              container.children,
              (action.browsed.container || action.browsed.item || []).map(
                i => ({
                  ...i,
                  ...mapJson({ ...i, selectedDevice }, dlnaItemMapping),
                })
              ),
              {
                arrayMerge,
              }
            );
        }
      }

      if (action.deviceType === 'plex') {
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
      }
      return;
    }
    case SHOW_BROWSER: {
      state.visible = true;
      return;
    }
    case HIDE_BROWSER: {
      state.visible = false;
      return;
    }
    default:
      return;
  }
}, initialState);
