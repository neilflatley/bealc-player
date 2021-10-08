import React from 'react';
import ContentList from './ContentList';

type Props = {
  node: any;
  handleBack: (id: string) => void;
  handleSelect: (id: string) => void;
};

const SelectedNode = ({ node, handleSelect, handleBack }: Props) => {
  if (!node) return null;
  const image = node.raw?.['upnp:icon'];
  const description = (node.raw?.['upnp:longDescription'] || '').toString();
  return (
    <div
      style={{
        background: '#eee',
        border: '1px solid #111',
        borderRadius: '5px',
        height: '100%',
        overflow: 'auto',
        padding: '10px 20px',
      }}
    >
      <h2>{node.title || node.name}</h2>
      {node.error && <p style={{ color: 'red' }}>{node.error}</p>}
      <button id="back" onClick={() => handleBack(node.parentID || node.path)}>
        go back
      </button>
      {image && <img src={`/devices/proxy?url=${encodeURIComponent(image)}`} />}
      <p>
        {description.substring(0, 200)}
        {description.length > 200 ? '...' : ''}
      </p>
      <ContentList
        content={node.children || node.content}
        handleSelect={handleSelect}
      />
    </div>
  );
};

export default SelectedNode;
