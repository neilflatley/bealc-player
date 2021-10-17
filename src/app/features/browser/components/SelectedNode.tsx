import React from 'react';
import StyledScrollbar from '~/components/StyledScrollbar';
import StyledNode from '../components.styled/SelectedNode.styled';
import ContentList from './ContentList';

type Props = {
  node: any;
  content: any[];
  handleAddToPlaylist: (items: any[]) => void;
  handleBack: (id: string) => void;
  handleSelect: (id: string) => void;
};

const SelectedNode = ({
  node,
  content,
  handleAddToPlaylist,
  handleSelect,
  handleBack,
}: Props) => {
  if (!node) return null;
  const title = node.title || node.name;
  const description = node.summary || '';
  const imageUri = node.thumbUri || node.imageUri;
  const goBackTo = node.parentID || node.path;

  const playable =
    (Array.isArray(content) && content?.filter(c => c.canPlay)) || [];

  return (
    <StyledNode>
      <div>
        <h2>{title}</h2>
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
        {imageUri && <img alt={title} src={imageUri} />}
        <StyledScrollbar style={{ maxHeight: '86px', paddingRight: '10px', marginBottom:'10px' }}>
          <p style={{ textAlign: 'justify' }}>
            {description}
          </p>
        </StyledScrollbar>
        {playable.length > 0 && (
          <button
            className="link-button play-button"
            onClick={() => handleAddToPlaylist(playable)}
            style={{ width: '100%' }}
          >
            Add to playlist
          </button>
        )}
        <ContentList content={content} handleSelect={handleSelect} />
      </div>
    </StyledNode>
  );
};

export default SelectedNode;
