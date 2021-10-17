import React from 'react';
import uniqueID from '~/core/util/unique';
import StyledPlaylist from '../components.styled/Playlist.styled';

type Props = {
  className: string;
  playlist: any[];
  visible: boolean;
  handleSelect: (pos: number) => void;
  handleClear: () => void;
  handleClose: () => void;
};

const Playlist = ({
  className,
  playlist,
  visible,
  handleClear,
  handleClose,
  handleSelect,
}: Props) => {
  if (!visible) return null;
  return (
    <StyledPlaylist className={className}>
      <div className="buttons-container">
        <button
          className="link-button"
          id="clear"
          onClick={() => {
            handleClear();
          }}
          title="Clear the current playlist"
        >
          clear
        </button>{' | '}
        <button
          className="link-button"
          id="hide"
          onClick={() => {
            handleClose();
          }}
          title="Hide the playlist panel"
        >
          hide
        </button>
      </div>
      <h2>Current playlist</h2>
      {(!playlist || playlist.length === 0) && <p>No items in playlist</p>}
      {playlist.map((c, pos) => (
        <div key={uniqueID()} className="playlist-item">
          <p
            title={`${c.album ? c.album : ''} ${c.year ? `(${c.year})` : ''} ${
              c.duration ? c.duration : ''
            }`}
          >
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
            <button
              className="link-button"
              onClick={() => {
                handleSelect(pos);
              }}
            >
              {c.track && `${c.track}. `} {c.title}
            </button>
            {c.artist && <span className="artist"> - {c.artist} </span>}
          </p>
        </div>
      ))}
    </StyledPlaylist>
  );
};

export default Playlist;
