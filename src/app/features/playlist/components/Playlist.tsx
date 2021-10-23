import React from 'react';
import StyledScrollbar from '~/components/StyledScrollbar';
import uniqueID from '~/core/util/unique';
import { symbols } from '~/theme/symbols';
import StyledPlaylist from '../components.styled/Playlist.styled';

type Props = {
  className: string;
  fullWidth: boolean;
  playlist: any[];
  visible: boolean;
  handleRemove: (pos: number) => void;
  handleSelect: (pos: number) => void;
  handleClear: () => void;
  handleClose: () => void;
};

const Playlist = ({
  className,
  fullWidth,
  playlist,
  visible,
  handleClear,
  handleClose,
  handleRemove,
  handleSelect,
}: Props) => {
  if (!visible) return null;
  return (
    <StyledPlaylist className={className} fullWidth={fullWidth}>
      <div>
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
          </button>
          {' | '}
          <button
            className="link-button"
            id="hide"
            onClick={() => {
              handleClose();
            }}
            title="Hide playlist"
          >
            {symbols.close}
          </button>
        </div>
        <h2>Current playlist</h2>
      </div>
      <StyledScrollbar>
        {(!playlist || playlist.length === 0) && <p>No items in playlist</p>}
        {playlist.map((c, pos) => (
          <div key={uniqueID()} className="playlist-item">
            <p
              title={`${c.album ? c.album : ''} ${
                c.year ? `(${c.year})` : ''
              } ${c.duration ? c.duration : ''}`}
            >
              <button
                className="link-button play-button"
                onClick={() => {
                  handleRemove(pos);
                }}
                title={`Remove ${c.title} from playlist`}
              >
                {symbols.remove}
              </button>{' '}
              {c.canPlay && (
                <button
                  className="link-button play-button"
                  onClick={() => {
                    handleSelect(pos);
                  }}
                  title={`Play ${c.title} [${c.duration}]`}
                >
                  {c.isPlaying ? symbols.playing : symbols.play}
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
      </StyledScrollbar>
    </StyledPlaylist>
  );
};

export default Playlist;
