import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import ResizingPane from 'react-resizing-pane';

import SelectedItem from '~/features/browser/components/SelectedItem';
import SelectedNode from '~/features/browser/components/SelectedNode';
import {
  browseServer,
  hideBrowser,
  selectContentNode,
  showBrowser,
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
  playerSeek,
  removeFromPlaylist,
  setProgress,
  setVolume,
  showPlaylist,
  togglePlayState,
} from '~/features/playlist/redux/actions';
import {
  selectCurrentPlaylist,
  selectIsPlaying,
  selectProgress,
  selectSeekTo,
  selectShowPlaylist,
  selectVolume,
} from '~/features/playlist/redux/selectors';
import Playlist from '~/features/playlist/components/Playlist';
import NowPlayingFooter from './NowPlayingFooter';
import StyledBrowser from '../components.styled/ServerBrowser.styled';
import { selectShowBrowser } from '~/features/device-discovery/redux/selectors';

export type PlayerProgress = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
  duration?: number;
};

const NotResizable = ({ children, style }) => {
  return <div style={style}>{children}</div>;
};

const ServerBrowser = ({
  deviceType,
  server,
}: {
  deviceType: 'dlna' | 'plex';
  server: number;
}) => {
  const isBigScreen = useMediaQuery({ query: '(min-width: 1250px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 650px)' });
  const viewMode = isBigScreen ? 0 : isTablet ? 1 : 2;

  const Resizable = isBigScreen ? ResizingPane : NotResizable;

  const dispatch = useDispatch();

  const browserVisible = useSelector(selectShowBrowser);
  const playlistVisible = useSelector(selectShowPlaylist);

  const selectedDevice = useSelector(selectCurrentDevice);
  const selectedItem = useSelector(selectCurrentItem);
  const selectedNode = useSelector(selectCurrentNode);
  const currentPlaylist = useSelector(selectCurrentPlaylist);
  const currentlyPlaying = currentPlaylist.find(i => i.isPlaying);
  const isPlaying = useSelector(selectIsPlaying);
  const progress = useSelector(selectProgress);
  const [playProgress, setPlayProgress] = useState(0);

  const seekTo = useSelector(selectSeekTo);
  const volume = useSelector(selectVolume);
  const autoPlay = useSelector(state => state.browser.autoPlay);

  useEffect(() => {
    setPlayProgress(seekTo);
  }, [seekTo]);

  useEffect(() => {
    setPlayProgress(progress.playedSeconds);
  }, [progress.playedSeconds]);

  if (typeof window === 'undefined') return null;

  const node = selectedNode || selectedDevice;
  const content = node?.children || node?.content;

  const nowPlaying = currentlyPlaying || selectedItem;

  const columns = playlistVisible ? 3 : 2;

  const handleHide = () => {
    dispatch(hideBrowser());
  };

  const handleSelect = (id = '0', autoPlay = false) => {
    dispatch(browseServer(selectedDevice, deviceType, id));
    dispatch(selectContentNode(selectedDevice, deviceType, id, autoPlay));
  };

  const handleAddToPlaylist = (content: any[], autoPlay = true) => {
    dispatch(addToPlaylist(content, autoPlay));
    dispatch(showPlaylist());
  };

  const handlePlayNext = (pos?: number) => {
    dispatch(advancePlaylist(pos));
  };

  const handlePlayPrevious = () => {
    const pos = currentPlaylist.findIndex(i => i.isPlaying);
    dispatch(advancePlaylist(pos < 1 ? 0 : pos - 1));
  };

  const handleProgress = (progress: PlayerProgress) => {
    dispatch(setProgress(progress));
  };

  const handleRemove = (pos: number) => {
    dispatch(removeFromPlaylist(pos));
  };

  const handleSeek = (nextValue: number) => {
    dispatch(playerSeek(nextValue));
  };

  const handleToggleBrowser = () => {
    if (browserVisible) dispatch(hideBrowser());
    else dispatch(showBrowser());
  };

  const handleTogglePlay = () => dispatch(togglePlayState());

  const handleTogglePlaylist = () => {
    if (playlistVisible) dispatch(hidePlaylist());
    else dispatch(showPlaylist());
  };
  const handleVolume = (volume: number) => {
    dispatch(setVolume(volume));
  };

  if (!selectedDevice && typeof window !== 'undefined') {
    window.location.hash = '/';
  }

  return (
    <>
      <StyledBrowser columns={columns} nowPlaying={nowPlaying}>
        {browserVisible && (
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
              handleHide={handleHide}
              handleSelect={handleSelect}
              handleBack={(id: string) => {
                dispatch(selectContentNode(selectedDevice, deviceType, id));
              }}
            />
          </Resizable>
        )}
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
              handleRemove={handleRemove}
              handleSelect={handlePlayNext}
            />
          </Resizable>
        )}
        <SelectedItem
          className="selected-item"
          autoPlay={autoPlay}
          {...nowPlaying}
          player={{ isPlaying, volume }}
          seekTo={seekTo}
          handlePlayNext={handlePlayNext}
          handleProgress={handleProgress}
          handleVolume={handleVolume}
        />
      </StyledBrowser>
      <NowPlayingFooter
        handleSeek={handleSeek}
        handleSkip={handlePlayNext}
        handleSkipPrevious={handlePlayPrevious}
        handleToggleBrowser={handleToggleBrowser}
        handleTogglePlay={handleTogglePlay}
        handleTogglePlaylist={handleTogglePlaylist}
        handleVolume={handleVolume}
        isPlaying={isPlaying}
        loaded={progress.loaded}
        played={playProgress}
        progress={progress}
        playlistVisible={playlistVisible}
        volume={volume}
        nowPlaying={nowPlaying}
        viewMode={viewMode}
      />
    </>
  );
};

export default ServerBrowser;