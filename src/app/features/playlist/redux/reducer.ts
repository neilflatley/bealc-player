import { produce, Draft } from 'immer';
import merge from 'deepmerge';
import {
  ADD_TO_PLAYLIST,
  ADVANCE_PLAYLIST,
  CLEAR_PLAYLIST,
  HIDE_PLAYLIST,
  PLAYER_PROGRESS,
  PLAYER_SEEK,
  REMOVE_FROM_PLAYLIST,
  SET_VOLUME,
  SHOW_PLAYLIST,
  TOGGLE_PLAYING,
} from './types';

const initialState = {
  current: [],
  player: {
    volume: 0.8,
    isPlaying: false,
    progress: {
      played: 0.0,
      playedSeconds: 0.0,
      loaded: 0.0,
      loadedSeconds: 0.0,
    },
    seekTo: 0,
  },
  visible: false,
};

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
    case CLEAR_PLAYLIST: {
      const nowPlaying = state.current.find(i => i.isPlaying);

      if (nowPlaying && state.current.length > 1) state.current = [nowPlaying];
      else {
        state.current = [];
        state.player.isPlaying = false;
      }
      return;
    }
    case ADD_TO_PLAYLIST: {
      const newItems = action.items.map(i => ({ ...i }));
      if (action.autoPlay && newItems.length > 0) {
        state.current = state.current.map(i => ({ ...i, isPlaying: false }));
        state.player.isPlaying = true;
        newItems[0].isPlaying = true;
      }
      state.current = merge(state.current, newItems, {
        combineMerge,
      });
      return;
    }
    case REMOVE_FROM_PLAYLIST: {
      const { isPlaying } = state.current[action.pos];
      state.current.splice(action.pos, 1);

      if (isPlaying && action.pos < state.current.length) {
        state.current[action.pos].isPlaying = true;
      }

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

      if (currentlyPlaying) currentlyPlaying.isPlaying = false;
      if (state.current.length > nextPos) {
        const nextItem = state.current[nextPos];
        nextItem.isPlaying = true;
        state.player.isPlaying = true;
      } else {
        state.player.isPlaying = false;
      }
      return;
    }
    case SET_VOLUME: {
      state.player.volume = action.volume;
      return;
    }
    case TOGGLE_PLAYING: {
      state.player.isPlaying = !state.player.isPlaying;
      return;
    }
    case PLAYER_PROGRESS: {
      state.player.progress = { ...state.player.progress, ...action.progress };
      return;
    }
    case PLAYER_SEEK: {
      state.player.seekTo = action.nextNumber;
      return;
    }
    default:
      return;
  }
}, initialState);
