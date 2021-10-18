import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import MediaLinkModal from '~/components/MediaLinkModal';
import Progress from '~/components/slider/Progress';
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
  display: flex;

  button {
    width: ${p => ['40px', '30px', '20px'][p.viewMode]};
    height: ${p => ['40px', '30px', '20px'][p.viewMode]};
    margin: ${p => ['0px', '5px', '10px'][p.viewMode]} 2px;
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
    width: ${p => ['50px', '40px', '30px'][p.viewMode]};
    height: ${p => ['50px', '40px', '30px'][p.viewMode]};
  }
  .buttons-container {
    width: ${p => ['250px', '180px', '130px'][p.viewMode]};
  }

  .progress-container {
    display: inline-flex;
    position: relative;
    margin: ${p => ['16px', '20px', '20px'][p.viewMode]} 5px;
    flex-grow: 1;
  }

  .volume-container {
    float: right;
    width: ${p => ['200px', '100px', '50px'][p.viewMode]};
    display: inline-block;
    margin: ${p => ['16px', '20px', '20px'][p.viewMode]} 5px;
  }
`;

const NowPlayingFooter = ({
  nowPlaying,
  loaded,
  played,
  volume,
  handleSkip,
  handleVolume,
  viewMode,
}) => {
  const dispatch = useDispatch();
  const playlistVisible = useSelector(selectShowPlaylist);
  const isPlaying = useSelector(selectIsPlaying);

  return (
    <StyledFooter viewMode={viewMode}>
      <div className="buttons-container">
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
      </div>
      <div className="progress-container">
        <Progress
          played={played}
          loaded={loaded}
          styling={{
            width: '100%',
            height: ['20px', '8px', '8px'][viewMode],
            thumbSize: ['0px', '0px', '0px'][viewMode],
          }}
        />
      </div>
      <div className="volume-container">
        <Volume
          volume={volume}
          onChange={handleVolume}
          styling={{
            width: ['200px', '100px', '50px'][viewMode],
            height: ['20px', '8px', '8px'][viewMode],
            thumbSize: ['24px', '14px', '20px'][viewMode],
            thumbOffset: ['-2px', '-3px', '-6px'][viewMode],
          }}
        />
      </div>
    </StyledFooter>
  );
};

export default NowPlayingFooter;
