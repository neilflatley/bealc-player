import React from 'react';
import uniqueID from '~/core/util/unique';
import { completeApiPath } from '~/features/plex/util';


type Props = {
  content: any[];
  handleSelect: (id: string) => void;
};

const ContentList = ({ content, handleSelect }: Props) => {
  return (
    <div>
      {Array.isArray(content) &&
        content.map(c => (
          <button
            key={uniqueID()}
            onClick={() => {
              const id =
                c.id ||
                (c.key?.startsWith('/')
                  ? c.key
                  : completeApiPath(
                      `${c.path}/${c.key}`
                    ));
              handleSelect(id)
            }}
          >
            {c.title}
          </button>
        ))}
    </div>
  );
};

export default ContentList;
