import { produce, Draft } from 'immer';
import merge from 'deepmerge';
import {
  ADD_TO_PLAYLIST,
  ADVANCE_PLAYLIST,
  HIDE_PLAYLIST,
  SHOW_PLAYLIST,
} from './types';

const initialState = {
  current: [],
  visible: false,
};

const arrayMerge = (_, sourceArray) => sourceArray;
const combineMerge = (target, source, options) => {
  const destination = target.slice();

  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = merge(target[index], item, options);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });
  return destination;
};

export default produce((state: Draft<any>, action) => {
  switch (action.type) {
    case SHOW_PLAYLIST: {
      state.visible = true;
      return;
    }
    case HIDE_PLAYLIST: {
      state.visible = false;
      return;
    }
    case ADD_TO_PLAYLIST: {
      const newItems = action.items.map(i => ({ ...i }));
      if (action.autoPlay && newItems.length > 0) {
        state.current = state.current.map(i => ({ ...i, isPlaying: false }));
        newItems[0].isPlaying = true;
      }
      state.current = merge(state.current, newItems, { combineMerge });
      return;
    }
    case ADVANCE_PLAYLIST: {
      const currentlyPlaying =
        state.current.find(i => i.isPlaying === true) || state.current[0];

      const currentPos = state.current.findIndex(i => i.isPlaying === true);
      const nextPos =
        typeof action.pos !== 'undefined'
          ? action.pos
          : (currentPos === -1 ? 0 : currentPos) + 1;

      currentlyPlaying.isPlaying = false;
      if (state.current.length >= nextPos) {
        const nextItem = state.current[nextPos];
        nextItem.isPlaying = true;
      }
      return;
    }
    default:
      return;
  }
}, initialState);
