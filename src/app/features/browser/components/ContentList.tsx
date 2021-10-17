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
          <div key={uniqueID()} className="library-item">
            <p>
              {' '}
              {c.canPlay && (
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
          </div>
        ))}
    </div>
  );
};

export default ContentList;
