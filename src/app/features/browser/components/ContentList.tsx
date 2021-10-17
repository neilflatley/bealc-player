import React from 'react';
import uniqueID from '~/core/util/unique';
import { completeApiPath } from '~/features/plex/util';
import { symbols } from '~/theme/symbols';

type Props = {
  content: any[];
  handleSelect: (id: string, autoPlay?: boolean) => void;
  handleAddToPlaylist;
};

const mapContentId = (c: any) =>
  c.id ||
  (c.key?.startsWith('/') ? c.key : completeApiPath(`${c.path}/${c.key}`));

const ContentList = ({ content, handleSelect, handleAddToPlaylist }: Props) => {
  return (
    <div>
      {Array.isArray(content) &&
        content.map(c => (
          <div key={uniqueID()} className="library-item">
            <p>
              {c.canPlay && (
                <button
                  className="link-button play-button"
                  onClick={() => {
                    handleAddToPlaylist([c], false);
                  }}
                  title={`Add to playlist`}
                >
                  {symbols.playlist}
                </button>
              )}
              {c.canPlay && (
                <button
                  className="link-button play-button"
                  onClick={() => {
                    handleAddToPlaylist([c], true);
                    // handleSelect(mapContentId(c), true);
                  }}
                  title={`Play ${c.title} [${c.duration}]`}
                >
                  {symbols.play}
                </button>
              )}{' '}
              <button
                className="link-button"
                onClick={() => {
                  handleSelect(mapContentId(c), true);
                }}
              >
                {c.track && `${c.track}. `} {c.title}
              </button>
            </p>
          </div>
        ))}
    </div>
  );
};

export default ContentList;
