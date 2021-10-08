import React from 'react';
import { useDispatch } from 'react-redux';

import { browseServer, selectContentNode } from '../redux/actions';

import SelectedItem from '~/features/device-discovery/components/SelectedItem';
import SelectedNode from '~/features/device-discovery/components/SelectedNode';
import ResizingPane from 'react-resizing-pane';

const PlexServerBrowser = ({ selectedItem, selectedNode }) => {
  const dispatch = useDispatch();
  return (
    <div
      style={{
        background: '#111',
        border: '1px solid #eee',
        borderRadius: '5px',
        display: 'grid',
        gridTemplateColumns: '1fr 9fr',
        minHeight: '400px',
        minWidth: '100%',
        padding: '10px',
      }}
    >
      <ResizingPane
        sides={['top', 'bottom', 'left', 'right']}
        style={{
          minHeight: '100%',
          minWidth: '120px',
        }}
      >
        <SelectedNode
          node={selectedNode}
          handleSelect={(id: string) => {
            dispatch(
              browseServer(
                id,
                selectedNode
                  ? `${selectedNode.path}/${selectedNode.key}`
                  : '/library/sections'
              )
            );
            dispatch(selectContentNode(id));
          }}
          handleBack={(id: string) => {
            dispatch(selectContentNode(id));
          }}
        />
      </ResizingPane>
      <SelectedItem {...selectedItem} />
    </div>
  );
};

export default PlexServerBrowser;
