import React from 'react';
import StyledNode from '../components.styled/SelectedNode.styled';
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
  const goBackTo = node.parentID || node.path;
  return (
    <StyledNode>
      <div>
        <h2>{node.title || node.name}</h2>
        {node.error && <p style={{ color: 'red' }}>{node.error}</p>}
        {typeof goBackTo !== 'undefined' && (
          <p>
            <button
              id="back"
              className="link-button"
              onClick={() => handleBack(goBackTo)}
            >
              ⏶ go back
            </button>
          </p>
        )}
        {image && (
          <img src={`/devices/proxy?url=${encodeURIComponent(image)}`} />
        )}
        <p>
          {description.substring(0, 200)}
          {description.length > 200 ? '...' : ''}
        </p>
        <ContentList
          content={node.children || node.content}
          handleSelect={handleSelect}
        />
      </div>
    </StyledNode>
  );
};

export default SelectedNode;
