import React from 'react';
import styled from 'styled-components';

import MediaLinkModal from '~/components/MediaLinkModal';
import Progress from '~/components/slider/Progress';
import Volume from '~/components/slider/Volume';
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
    margin-right: 5px;
    width: ${p => ['250px', '180px', '130px'][p.viewMode]};
  }

  .time-container {
    margin: ${p => ['20px', '16px', '16px'][p.viewMode]} 2px;
    font-size: ${p => ['120%', '80%', '65%'][p.viewMode]};
    width: ${p => ['45px', '30px', '25px'][p.viewMode]};
  }

  .progress-container {
    display: inline-flex;
    position: relative;
    margin: ${p => ['16px', '20px', '20px'][p.viewMode]} 5px;
    flex-grow: 1;
  }

  .volume-container {
    float: right;
    width: ${p => ['200px', '100px', '100px'][p.viewMode]};
    display: inline-block;
    margin: ${p => ['16px', '20px', '20px'][p.viewMode]} 5px;
  }

  .far-right-container {
    float: right;
    width: ${p => ['40px', '30px', '20px'][p.viewMode]};
    display: inline-block;
    margin: ${p => ['4px', '3px', '3px'][p.viewMode]} 5px;
  }
`;

const formatSeconds = (seconds = 0) => {
  const d = new Date(seconds * 1000);

  return `${d.getMinutes().toString().padStart(2, '0')}:${d
    .getSeconds()
    .toString()
    .padStart(2, '0')}`;
};

const NowPlayingFooter = ({
  nowPlaying,
  isPlaying,
  loaded,
  played,
  progress,
  volume,
  handleSeek,
  handleSkip,
  handleSkipPrevious,
  handleToggleBrowser,
  handleTogglePlay,
  handleTogglePlaylist,
  handleVolume,
  playlistVisible,
  viewMode,
}) => {
  if (!nowPlaying) return null;
  return (
    <StyledFooter viewMode={viewMode}>
      <div className="buttons-container">
        <button
          className="link-button"
          onClick={handleToggleBrowser}
          style={{
            fontSize: playlistVisible ? '110%' : 'inherit',
          }}
          title="Library"
        >
          {symbols.browser}
        </button>
        <button
          className="link-button"
          onClick={handleTogglePlaylist}
          style={{
            fontSize: playlistVisible ? '110%' : 'inherit',
          }}
          title="Playlist"
        >
          {symbols.playlist}
        </button>
        <button
          className="link-button"
          onClick={() => handleSkipPrevious()}
          style={{
            fontSize: playlistVisible ? '110%' : 'inherit',
          }}
          title="Previous"
        >
          {symbols.previous}
        </button>
        <button
          className="link-button play"
          onClick={handleTogglePlay}
          style={{
            fontSize: playlistVisible ? '110%' : 'inherit',
          }}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? symbols.pause : symbols.play}
        </button>
        <button
          className="link-button"
          onClick={() => handleSkip()}
          style={{
            fontSize: playlistVisible ? '110%' : 'inherit',
          }}
          title="Next"
        >
          {symbols.next}
        </button>
      </div>
      {played ? (
        <div className="time-container">
          <span className="played">{formatSeconds(played)}</span>
        </div>
      ) : null}
      {viewMode < 2 && (
        <div className="progress-container">
          <Progress
            duration={progress?.duration}
            played={played}
            loaded={progress?.loadedSeconds}
            onChange={nextValue => handleSeek(nextValue)}
            styling={{
              width: '100%',
              height: ['16px', '8px', '8px'][viewMode],
              thumbSize: ['16px', '8px', '8px'][viewMode],
            }}
          />
        </div>
      )}
      {progress?.duration && (
        <div className="time-container">
          <span className="played">{formatSeconds(progress?.duration)}</span>
        </div>
      )}
      <div className="volume-container">
        <Volume
          volume={volume}
          onChange={handleVolume}
          styling={{
            width: ['200px', '100px', '50px'][viewMode],
            height: ['16px', '8px', '8px'][viewMode],
            thumbSize: ['24px', '14px', '20px'][viewMode],
            thumbOffset: ['-4px', '-3px', '-6px'][viewMode],
          }}
        />
      </div>
      <div className="far-right-container">
        <MediaLinkModal
          uri={nowPlaying?.mediaUri}
          buttonText={symbols.vlc}
          copiedText={symbols.vlc}
        />
      </div>
    </StyledFooter>
  );
};

export default NowPlayingFooter;
