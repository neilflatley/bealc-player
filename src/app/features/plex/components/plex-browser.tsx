import React from 'react';
import { useDispatch } from 'react-redux';

import { browseServer, selectContentNode } from '../redux/actions';

import SelectedItem from '~/features/device-discovery/components/SelectedItem';
import SelectedNode from '~/features/device-discovery/components/SelectedNode';
import ServerBrowser from '~/components/ServerBrowser';

const PlexServerBrowser = ({ selectedItem, selectedNode }) => {
  const dispatch = useDispatch();
  return (
    <ServerBrowser
      selectedNode={() => (
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
      )}
      selectedItem={() => <SelectedItem {...selectedItem} />}
    />
  );
};

export default PlexServerBrowser;
