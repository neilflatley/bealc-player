import React from 'react';
import styled from 'styled-components';
import ResizingPane from 'react-resizing-pane';

const StyledBrowser = styled.div`
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 9fr;
  min-height: 400px;
  min-width: 100%;
  padding: 10px;
`;

const ServerBrowser = ({ selectedItem, selectedNode }) => {
  return (
    <StyledBrowser>
      <ResizingPane
        height={550}
        storageId={1}
        sides={['top', 'bottom', 'left', 'right']}
        style={{
          minHeight: '100%',
          minWidth: '120px',
          border: 'none',
        }}
      >
        {selectedNode()}
      </ResizingPane>
      {selectedItem()}
    </StyledBrowser>
  );
};

export default ServerBrowser;
