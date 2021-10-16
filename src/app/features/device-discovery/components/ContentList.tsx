import React from 'react';
import uniqueID from '~/core/util/unique';
import { completeApiPath } from '~/features/plex/util';

type Props = {
  content: any[];
  handleSelect: (id: string, autoPlay?: boolean) => void;
};

const ContentList = ({ content, handleSelect }: Props) => {
  return (
    <div>
      {Array.isArray(content) &&
        content.map(c => (
          <p key={uniqueID()}>
            {' '}
            {(c.type === 'album' || c.album) && (
              <button
                className="link-button play-button"
                onClick={() => {
                  const id =
                    c.id ||
                    (c.key?.startsWith('/')
                      ? c.key
                      : completeApiPath(`${c.path}/${c.key}`));
                  handleSelect(id, true);
                }}
                title={`Play ${c.title} [${c.duration}]`}
              >
                ▶
              </button>
            )}{' '}
            <button
              className="link-button"
              onClick={() => {
                const id =
                  c.id ||
                  (c.key?.startsWith('/')
                    ? c.key
                    : completeApiPath(`${c.path}/${c.key}`));
                handleSelect(id);
              }}
            >
              {c.title}
            </button>
          </p>
        ))}
    </div>
  );
};

export default ContentList;
