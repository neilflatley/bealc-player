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
  handleHide: () => void;
  handleSelect: (id: string) => void;
};

const SelectedNode = ({
  className,
  node,
  content,
  handleAddToPlaylist,
  handleSelect,
  handleBack,
  handleHide,
}: Props) => {
  if (!node) return null;
  const title = node.title || node.name;
  const description = node.summary || '';
  const imageUri = node.thumbUri || node.imageUri;
  const goBackTo = node.parentID || node.path;
  const { album, artist, year } = node;

  const playable =
    (Array.isArray(content) && content?.filter(c => c.canPlay)) || [];

  return (
    <StyledNode className={className} imageUri={imageUri}>
      <div className="info-panel">
        {imageUri && (
          <div className="image-panel">
            <img alt={title} src={imageUri} />
          </div>
        )}
        <div>
          <div className="buttons">
            <button
              id="servers"
              className="link-button"
              onClick={() => {
                window.location.hash = '/';
              }}
              title="Change server"
            >
              {symbols.server}
            </button>
            {' | '}
            <button
              id="hide"
              className="link-button"
              onClick={() => handleHide()}
              title="Hide browser"
            >
              {symbols.close}
            </button>
          </div>
          <h2>{title}</h2>
          <h3>
            {album} {year && `[${year}]`} {artist && <span> - {artist}</span>}
          </h3>
          {node.error && <p style={{ color: 'red' }}>{node.error}</p>}
          {description && (
            <StyledScrollbar
              style={{
                maxHeight: '145px',
                paddingRight: '10px',
                marginBottom: '10px',
              }}
            >
              <p className="description" style={{ textAlign: 'justify' }}>
                {description}
              </p>
            </StyledScrollbar>
          )}
        </div>
        <div style={{ gridColumn: 'span 2' }}>
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
        </div>
        {typeof goBackTo !== 'undefined' && (
          <div style={{ padding: '10px 10px 0 10px', gridColumn: 'span 2' }}>
            <button
              id="back"
              className="link-button"
              onClick={() => handleBack(goBackTo)}
            >
              ⏶ go back
            </button>
          </div>
        )}
      </div>
      <StyledScrollbar
        style={{
          margin: '10px',
        }}
      >
        <ContentList
          content={content}
          handleAddToPlaylist={handleAddToPlaylist}
          handleSelect={handleSelect}
        />
      </StyledScrollbar>
    </StyledNode>
  );
};

export default SelectedNode;
