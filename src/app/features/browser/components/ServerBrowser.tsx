import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import ResizingPane from 'react-resizing-pane';

import SelectedItem from '~/features/browser/components/SelectedItem';
import SelectedNode from '~/features/browser/components/SelectedNode';
import {
  browseServer,
  selectContentNode,
} from '~/features/browser/redux/actions';
import {
  selectCurrentDevice,
  selectCurrentItem,
  selectCurrentNode,
} from '~/features/browser/redux/selectors';
import {
  addToPlaylist,
  advancePlaylist,
  clearPlaylist,
  hidePlaylist,
  setProgress,
  setVolume,
  showPlaylist,
} from '~/features/playlist/redux/actions';
import {
  selectCurrentPlaylist,
  selectIsPlaying,
  selectProgress,
  selectShowPlaylist,
  selectVolume,
} from '~/features/playlist/redux/selectors';
import Playlist from '~/features/playlist/components/Playlist';
import NowPlayingFooter from './NowPlayingFooter';

const StyledBrowser = styled.div`
  /* fill remaining height */
  position: absolute;
  top: 70px;
  bottom: 0;

  border-radius: 5px;
  display: grid;
  grid-gap: 0.5rem;

  min-width: 100%;
  padding: 10px 10px 70px 10px;

  @media (max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);

    .selected-node {
      ${p =>
        p.nowPlaying ? 'border-radius: 15px 15px 0 0;' : 'border-radius: 15px'}
    }

    .playlist {
      border-radius: 0;
    }

    .selected-item {
      grid-column: span 1;
      border-radius: 0 0 15px 15px;
    }
  }

  @media (min-width: 650px) {
    grid-template-columns: ${p => (p.columns === 3 ? 'repeat(2, 1fr)' : '1fr')};

    .selected-node {
      ${p =>
        p.columns === 3 && p.nowPlaying
          ? 'border-radius: 15px 0 0 0;'
          : p.columns === 3
          ? 'border-radius: 15px 0 0 15px;'
          : p.columns === 2 && p.nowPlaying
          ? 'border-radius: 15px 15px 0 0;'
          : p.columns === 2
          ? 'border-radius: 15px;'
          : ''}
    }

    .playlist {
      ${p =>
        p.nowPlaying
          ? 'border-radius: 0 15px 0 0;'
          : 'border-radius: 0 15px 15px 0;'}
    }

    .selected-item {
      grid-column: span 2;
      border-radius: 0 0 15px 15px;
    }
  }
  @media (min-width: 1250px) {
    grid-template-columns: ${p =>
      p.columns === 3 ? '1fr 1fr 8fr' : '1fr 9fr'};

    .selected-node {
      border-radius: 15px 0 0 15px;
    }

    .playlist {
      border-radius: 0;
    }

    .selected-item {
      grid-column: span 1;
      border-radius: 0 15px 15px 0;
    }
  }
`;

const NotResizable = ({ children, style }) => {
  return <div style={style}>{children}</div>;
};

const ServerBrowser = ({ deviceType }: { deviceType: 'dlna' | 'plex' }) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1250px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 650px)' });
  const viewMode = isBigScreen ? 0 : isTablet ? 1 : 2;

  const Resizable = isBigScreen ? ResizingPane : NotResizable;

  const dispatch = useDispatch();
  const selectedDevice = useSelector(selectCurrentDevice);
  const selectedItem = useSelector(selectCurrentItem);
  const selectedNode = useSelector(selectCurrentNode);
  const currentPlaylist = useSelector(selectCurrentPlaylist);
  const currentlyPlaying = currentPlaylist.find(i => i.isPlaying);
  const isPlaying = useSelector(selectIsPlaying);
  const progress = useSelector(selectProgress);
  const volume = useSelector(selectVolume);
  const playlistVisible = useSelector(selectShowPlaylist);
  const autoPlay = useSelector(state => state.browser.autoPlay);

  if (typeof window === 'undefined') return null;

  const node = selectedNode || selectedDevice;
  const content = node?.children || node?.content;

  const nowPlaying = currentlyPlaying || selectedItem;

  const columns = playlistVisible ? 3 : 2;

  const handleSelect = (id = '0', autoPlay = false) => {
    dispatch(browseServer(selectedDevice, deviceType, id));
    dispatch(selectContentNode(selectedDevice, deviceType, id, autoPlay));
  };

  const handleAddToPlaylist = (content: any[], autoPlay = true) => {
    dispatch(addToPlaylist(content, autoPlay));
    dispatch(showPlaylist());
  };

  const handlePlayNext = (pos?: number, el?: HTMLAudioElement) => {
    dispatch(advancePlaylist(pos));
  };
  const handleProgress = (progress: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    dispatch(setProgress(progress));
  };
  const handleVolume = (volume: number) => {
    dispatch(setVolume(volume));
  };

  return (
    <>
      <StyledBrowser columns={columns} nowPlaying={nowPlaying}>
        <Resizable
          storageId={1}
          sides={['left', 'right']}
          style={{
            minHeight: '100%',
            minWidth: '120px',
            border: 'none',
          }}
        >
          <SelectedNode
            className="selected-node"
            node={node}
            content={content}
            handleAddToPlaylist={handleAddToPlaylist}
            handleSelect={handleSelect}
            handleBack={(id: string) => {
              dispatch(selectContentNode(selectedDevice, deviceType, id));
            }}
          />
        </Resizable>
        {playlistVisible && (
          <Resizable
            storageId={2}
            sides={['right']}
            style={{
              minHeight: '100%',
              minWidth: '120px',
              border: 'none',
            }}
          >
            <Playlist
              className="playlist"
              playlist={currentPlaylist}
              visible={playlistVisible}
              handleClear={() => {
                dispatch(clearPlaylist());
              }}
              handleClose={() => {
                dispatch(hidePlaylist());
              }}
              handleSelect={handlePlayNext}
            />
          </Resizable>
        )}
        <SelectedItem
          className="selected-item"
          autoPlay={autoPlay}
          {...nowPlaying}
          player={{ isPlaying, volume }}
          handlePlayNext={handlePlayNext}
          handleProgress={handleProgress}
          handleVolume={handleVolume}
        />
      </StyledBrowser>
      <NowPlayingFooter
        handleSkip={handlePlayNext}
        loaded={progress.loaded}
        played={progress.played}
        volume={volume}
        handleVolume={handleVolume}
        nowPlaying={nowPlaying}
        viewMode={viewMode}
      />
    </>
  );
};

export default ServerBrowser;
