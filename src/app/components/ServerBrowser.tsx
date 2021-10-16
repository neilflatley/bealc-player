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

const StyledBrowser = styled.div`
  /* fill remaining height */
  position: absolute;
  top: 70px;
  bottom: 0;

  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 9fr;
  min-width: 100%;
  padding: 10px;
`;

const ServerBrowser = ({ deviceType }: { deviceType: 'dlna' | 'plex' }) => {
  const dispatch = useDispatch();
  const selectedDevice = useSelector(selectCurrentDevice);
  const selectedItem = useSelector(selectCurrentItem);
  const selectedNode = useSelector(selectCurrentNode);
  const autoPlay = useSelector(state => state.browser.autoPlay);

  if (typeof window === 'undefined') return null;
  return (
    <StyledBrowser>
      <ResizingPane
        height={550}
        storageId={1}
        sides={['left', 'right']}
        style={{
          minHeight: '100%',
          minWidth: '120px',
          border: 'none',
        }}
      >
        <SelectedNode
          node={selectedNode || selectedDevice}
          handleSelect={(id = '0', autoPlay = false) => {
            dispatch(browseServer(selectedDevice, deviceType, id));
            dispatch(
              selectContentNode(selectedDevice, deviceType, id, autoPlay)
            );
          }}
          handleBack={(id: string) => {
            dispatch(selectContentNode(selectedDevice, deviceType, id));
          }}
        />
      </ResizingPane>
      <SelectedItem autoPlay={autoPlay} {...selectedItem} />
    </StyledBrowser>
  );
};

export default ServerBrowser;
