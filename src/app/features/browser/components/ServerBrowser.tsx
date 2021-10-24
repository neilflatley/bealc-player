import React from 'react';
import { Route, Switch, useParams } from 'react-router';
import { HashRouter, StaticRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

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
  selectCurrentNode,
} from '~/features/browser/redux/selectors';
import {
  addToPlaylist,
  advancePlaylist,
  clearPlaylist,
  hidePlaylist,
  playerSeek,
  removeFromPlaylist,
  setPlayerType,
  setProgress,
  setVolume,
  showPlaylist,
  togglePlayState,
} from '~/features/playlist/redux/actions';
import {
  selectCurrentPlaylist,
  selectIsPlaying,
  selectNowPlaying,
  selectSeekTo,
  selectShowPlaylist,
  selectVolume,
} from '~/features/playlist/redux/selectors';
import Playlist from '~/features/playlist/components/Playlist';
import NowPlayingFooter from './NowPlayingFooter';
import StyledBrowser from '../components.styled/ServerBrowser.styled';
import { selectShowBrowser } from '~/features/device-discovery/redux/selectors';
import DevicesTabs from '~/features/browser/devices-tabs';
import Resizable from './Resizable';

const Router = typeof window !== 'undefined' ? HashRouter : StaticRouter;

export type PlayerProgress = {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
  duration?: number;
};

const ServerBrowser = ({ deviceType }: { deviceType: 'dlna' | 'plex' }) => {
  const { server } = useParams();

  const isBigScreen = useMediaQuery({ query: '(min-width: 1250px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 650px)' });
  const viewMode = isBigScreen ? 0 : isTablet ? 1 : 2;

  const dispatch = useDispatch();

  const browserVisible = useSelector(selectShowBrowser);
  const playlistVisible = useSelector(selectShowPlaylist);

  const selectedDevice = useSelector(selectCurrentDevice);
  const selectedNode = useSelector(selectCurrentNode);
  const currentPlaylist = useSelector(selectCurrentPlaylist);
  const nowPlaying = useSelector(selectNowPlaying);
  const isPlaying = useSelector(selectIsPlaying);

  const seekTo = useSelector(selectSeekTo);
  const volume = useSelector(selectVolume);
  const autoPlay = useSelector(state => state.browser.autoPlay);

  if (typeof window === 'undefined') return null;

  const node = selectedNode || selectedDevice;
  const content = node?.children || node?.content;

  const visibleColumns = [browserVisible, playlistVisible, !!nowPlaying];
  const columns = visibleColumns.filter(isVisible => isVisible).length;

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

  const handleSetPlayerType = (type: 'audio' | 'video') => {
    dispatch(setPlayerType(type));
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
  const ResizablePane = Resizable(viewMode === 0);

  return (
    <>
      <StyledBrowser
        columns={columns}
        nowPlaying={nowPlaying}
        fullWidth={
          (!playlistVisible && columns < 3) ||
          (!browserVisible && columns < 3) ||
          !isBigScreen
        }
      >
        {browserVisible && (
          <ResizablePane
            height={'100%'}
            storageId={`${viewMode}_1`}
            sides={['left', 'right']}
            style={{
              minHeight: '150px',
              minWidth: '120px',
              border: 'none',
            }}
          >
            <Router>
              <Switch>
                <Route exact path="/">
                  <DevicesTabs />
                </Route>
                <Route path="/server/:server">
                  <SelectedNode
                    className="selected-node"
                    content={content}
                    fullWidth={
                      (!playlistVisible && columns < 3) ||
                      (!isBigScreen && columns < 3)
                    }
                    node={node}
                    handleAddToPlaylist={handleAddToPlaylist}
                    handleHide={handleHide}
                    handleSelect={handleSelect}
                    handleBack={(id: string) => {
                      dispatch(
                        selectContentNode(selectedDevice, deviceType, id)
                      );
                    }}
                  />
                </Route>
              </Switch>
            </Router>
          </ResizablePane>
        )}
        {playlistVisible && (
          <ResizablePane
            height={'100%'}
            storageId={`${viewMode}_2`}
            sides={['right']}
            style={{
              minHeight: '120px',
              minWidth: '120px',
              border: 'none',
            }}
          >
            <Playlist
              className="playlist"
              fullWidth={!browserVisible && columns < 3}
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
          </ResizablePane>
        )}
        <SelectedItem
          className="selected-item"
          autoPlay={autoPlay}
          {...nowPlaying}
          player={{ isPlaying, volume }}
          seekTo={seekTo}
          viewMode={viewMode}
          handlePlayNext={handlePlayNext}
          handleProgress={handleProgress}
          handleSetPlayerType={handleSetPlayerType}
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
        playlistVisible={playlistVisible}
        seekTo={seekTo}
        volume={volume}
        nowPlaying={nowPlaying}
        viewMode={viewMode}
      />
    </>
  );
};

export default ServerBrowser;
