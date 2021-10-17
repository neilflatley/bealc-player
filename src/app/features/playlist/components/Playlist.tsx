import React from 'react';
import uniqueID from '~/core/util/unique';
import { completeApiPath } from '~/features/plex/util';
import StyledPlaylist from '../components.styled/Playlist.styled';

type Props = {
  playlist: any[];
  visible: boolean;
  handleSelect: (pos: number ) => void;
  handleClose: () => void;
};

const Playlist = ({ playlist, visible, handleClose, handleSelect }: Props) => {
  if (!visible) return null;
  return (
    <StyledPlaylist>
      <button
        className="link-button"
        id="hide"
        onClick={() => {
          handleClose();
        }}
      >
        hide
      </button>
      <h2>Current playlist</h2>

      {playlist.map((c, pos) => (
        <div key={uniqueID()} className="playlist-item">
          <p>
            {' '}
            {c.canPlay && (
              <button
                className="link-button play-button"
                onClick={() => {
                  handleSelect(pos);
                }}
                title={`Play ${c.title} [${c.duration}]`}
              >
                {c.isPlaying ? '...' : '▶'}
              </button>
            )}{' '}
            <button className="link-button" onClick={() => {}}>
              {c.title}
            </button>
          </p>
        </div>
      ))}
    </StyledPlaylist>
  );
};

export default Playlist;
