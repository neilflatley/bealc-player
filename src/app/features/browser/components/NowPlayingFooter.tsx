import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MediaLinkModal from '~/components/MediaLinkModal';
import Volume from '~/components/slider/Volume';
import {
  hidePlaylist,
  showPlaylist,
  togglePlayState,
} from '~/features/playlist/redux/actions';
import {
  selectIsPlaying,
  selectShowPlaylist,
} from '~/features/playlist/redux/selectors';
import { symbols } from '~/theme/symbols';

const StyledFooter = styled.div`
  position: absolute;
  bottom: 0px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  margin: 10px;
  padding: 0 10px;
  width: -webkit-fill-available;
  height: 50px;

  button {
    width: 40px;
    height: 40px;
    padding: 8px;
    margin: 0 2px;
    font-size: 140%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 25px;
    color: #1db954;
  }

  button:hover {
    background-color: #069;
    color: #eee;
    border: 1px solid #eee;
    opacity: 0.8;
    text-decoration: none;
  }
  .play {
    width: 50px;
    height: 50px;
    padding: 10px;
  }
  .volume-container {
    float: right;
    width: 200px;
    display: inline-block;
    margin: 18px;
  }
`;

const NowPlayingFooter = ({ nowPlaying, volume, handleSkip, handleVolume }) => {
  const dispatch = useDispatch();
  const playlistVisible = useSelector(selectShowPlaylist);
  const isPlaying = useSelector(selectIsPlaying);

  return (
    <StyledFooter>
      <MediaLinkModal
        uri={nowPlaying?.mediaUri}
        buttonText={symbols.vlc}
        copiedText={symbols.vlc}
      />
      <button
        className="link-button"
        onClick={() =>
          dispatch(playlistVisible ? hidePlaylist() : showPlaylist())
        }
        style={{
          fontSize: playlistVisible ? '150%' : 'inherit',
        }}
        title="Playlist"
      >
        {symbols.playlist}
      </button>
      <button
        className="link-button"
        onClick={() => handleSkip()}
        style={{
          fontSize: playlistVisible ? '150%' : 'inherit',
        }}
        title="Previous"
      >
        {symbols.previous}
      </button>
      <button
        className="link-button play"
        onClick={() => dispatch(togglePlayState())}
        style={{
          fontSize: playlistVisible ? '150%' : 'inherit',
        }}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? symbols.pause : symbols.play}
      </button>
      <button
        className="link-button"
        onClick={() => handleSkip()}
        style={{
          fontSize: playlistVisible ? '150%' : 'inherit',
        }}
        title="Next"
      >
        {symbols.next}
      </button>
      <div className="volume-container">
        <Volume volume={volume} onChange={handleVolume} />
      </div>
    </StyledFooter>
  );
};

export default NowPlayingFooter;
