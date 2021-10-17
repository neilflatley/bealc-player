import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
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
  hidePlaylist,
  showPlaylist,
} from '~/features/playlist/redux/actions';
import {
  selectCurrentPlaylist,
  selectShowPlaylist,
} from '~/features/playlist/redux/selectors';
import Playlist from '~/features/playlist/components/Playlist';

const StyledBrowser = styled.div`
  /* fill remaining height */
  position: absolute;
  top: 70px;
  bottom: 0;

  border-radius: 5px;
  display: grid;
  grid-template-columns: ${p => (p.columns === 3 ? '1fr 1fr 8fr' : '1fr 9fr')};
  min-width: 100%;
  padding: 10px;
`;

const ServerBrowser = ({ deviceType }: { deviceType: 'dlna' | 'plex' }) => {
  const dispatch = useDispatch();
  const selectedDevice = useSelector(selectCurrentDevice);
  const selectedItem = useSelector(selectCurrentItem);
  const selectedNode = useSelector(selectCurrentNode);
  const currentPlaylist = useSelector(selectCurrentPlaylist);
  const currentlyPlaying = currentPlaylist.find(i => i.isPlaying);
  const playlistVisible = useSelector(selectShowPlaylist);
  const autoPlay = useSelector(state => state.browser.autoPlay);

  if (typeof window === 'undefined') return null;

  const node = selectedNode || selectedDevice;
  const content = node?.children || node?.content;

  const columns = playlistVisible ? 3 : 2;

  const handleSelect = (id = '0', autoPlay = false) => {
    dispatch(browseServer(selectedDevice, deviceType, id));
    dispatch(selectContentNode(selectedDevice, deviceType, id, autoPlay));
  };

  const handlePlayNext = (pos?: number) => {
    dispatch(advancePlaylist(pos));
  };

  return (
    <StyledBrowser columns={columns}>
      <ResizingPane
        storageId={1}
        sides={['left', 'right']}
        style={{
          minHeight: '100%',
          minWidth: '120px',
          border: 'none',
        }}
      >
        <SelectedNode
          node={node}
          content={content}
          handleAddToPlaylist={(content: any[], autoPlay = true) => {
            dispatch(addToPlaylist(content, autoPlay));
            dispatch(showPlaylist());
          }}
          handleSelect={handleSelect}
          handleBack={(id: string) => {
            dispatch(selectContentNode(selectedDevice, deviceType, id));
          }}
        />
      </ResizingPane>
      {playlistVisible && (
        <ResizingPane
          storageId={2}
          sides={['right']}
          style={{
            minHeight: '100%',
            minWidth: '120px',
            border: 'none',
          }}
        >
          <Playlist
            playlist={currentPlaylist}
            visible={playlistVisible}
            handleClose={() => {
              dispatch(hidePlaylist());
            }}
            handleSelect={handlePlayNext}
          />
        </ResizingPane>
      )}
      <SelectedItem
        autoPlay={autoPlay}
        {...(currentlyPlaying || selectedItem)}
        handlePlayNext={handlePlayNext}
      />
    </StyledBrowser>
  );
};

export default ServerBrowser;
