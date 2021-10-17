import React from 'react';
import StyledScrollbar from '~/components/StyledScrollbar';
import { symbols } from '~/theme/symbols';
import StyledNode from '../components.styled/SelectedNode.styled';
import ContentList from './ContentList';

type Props = {
  className: string;
  node: any;
  content: any[];
  handleAddToPlaylist: (items: any[]) => void;
  handleBack: (id: string) => void;
  handleSelect: (id: string) => void;
};

const SelectedNode = ({
  className,
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
    <StyledNode className={className}>
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
        <StyledScrollbar
          style={{
            maxHeight: '86px',
            paddingRight: '10px',
            marginBottom: '10px',
          }}
        >
          <p className="description" style={{ textAlign: 'justify' }}>{description}</p>
        </StyledScrollbar>
        {playable.length > 0 && (
          <div>
            <button
              className="link-button play-button playlist-button"
              onClick={() => handleAddToPlaylist(playable)}
            >
              {symbols.play} Play
            </button>
            <button
              className="link-button play-button playlist-button"
              onClick={() => handleAddToPlaylist(playable, false)}
            >
              Add to playlist
            </button>
          </div>
        )}
        <ContentList
          content={content}
          handleAddToPlaylist={handleAddToPlaylist}
          handleSelect={handleSelect}
        />
      </div>
    </StyledNode>
  );
};

export default SelectedNode;
