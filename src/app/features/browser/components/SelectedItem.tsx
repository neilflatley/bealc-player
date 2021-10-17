import React, { useEffect, useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player';
import ResizingPane from 'react-resizing-pane';
import StyledItem from '../components.styled/SelectedItem.styled';

export type SelectedItemProps = {
  className: string;
  autoPlay: boolean;
  imageUri: string;
  thumbUri: string;
  mediaUri: string;
  title: string;
  artist: string;
  album: string;
  summary: string;
  year: string;
  duration: string;
  type: string;
  format: string;
  videoCodec: string;
  audioCodec: string;
  local: 'local' | 'remote';
  height: number;
  handlePlayNext: () => void;
  handleVolume: () => void;
  player: {
    isPlaying: boolean;
    volume: number;
  };
};

const SelectedItem = ({
  className,
  autoPlay,
  imageUri,
  thumbUri,
  mediaUri,
  title,
  artist,
  album,
  summary,
  year,
  duration,
  format,
  videoCodec,
  audioCodec,
  local,
  height,
  handlePlayNext,
  handleVolume,
  player,
}: SelectedItemProps) => {
  const [playerType, setPlayerType] = useState(
    ['mp3'].includes(format) ? 'audio' : 'video'
  );
  const [audioPlayer, setAudioPlayer] = useState(null);

  const [playerDimensions, setPlayerDimensions] = useState({
    width: 0,
    height: 0,
  });

  const parentRef = useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.offsetHeight;
      const parentWidth = parentRef.current.offsetWidth;
      setPlayerDimensions({
        width: parentWidth - 20,
        height: parentHeight,
      });
    }
  }, [parentRef, mediaUri]);

  useEffect(() => {
    if (['mp3'].includes(format) ? 'audio' : 'video') setPlayerType('audio');
  }, [format]);

  useEffect(() => {
    if (audioPlayer?.audioEl.current)
      if (player.isPlaying) {
        audioPlayer.audioEl.current.play();
      } else {
        audioPlayer.audioEl.current.pause();
      }
  }, [audioPlayer, player.isPlaying]);

  if (!title) return null;
  return (
    <StyledItem imageUri={imageUri} className={className}>
      <div className="item_info">
        <div className="thumb_column">
          {thumbUri && <img key={thumbUri} src={thumbUri} alt={title} />}
        </div>
        <div className="info_column">
          <div className="info_column_main">
            <button
              className="link-button"
              onClick={e => {
                e.preventDefault();
                setPlayerType(playerType === 'video' ? 'audio' : 'video');
              }}
            >
              Use {playerType === 'video' ? 'audio' : 'video'} player
            </button>{' '}
            {format && (
              <span className="format" title={`${videoCodec} / ${audioCodec}`}>
                {' '}
                {format}
              </span>
            )}
          </div>
          <h2>{title}</h2>
          <h3>
            {album} {year && `[${year}]`} {artist && <span> - {artist}</span>}
          </h3>
          {duration && <span className="duration"> {duration}</span>}

          {summary && (
            <div className="summary">
              <p>{summary}</p>
            </div>
          )}
        </div>
      </div>
      {mediaUri && (
        <div className="media_player_container" ref={parentRef}>
          {playerDimensions.width && playerType === 'audio' && (
            <div className="resizable" style={{ paddingTop: '16px' }}>
              <ReactAudioPlayer
                src={mediaUri}
                autoPlay
                controls
                onEnded={() => {
                  handlePlayNext();
                }}
                onVolumeChanged={e => {
                  handleVolume(e.target.volume);
                }}
                ref={el => setAudioPlayer(el)}
                style={{ width: '100%' }}
                volume={player.volume}
              />
            </div>
          )}
          {playerDimensions.width && playerType === 'video' && (
            <ResizingPane
              className="resizable"
              sides={['top', 'bottom', 'left', 'right']}
              height={height}
              width={playerDimensions.width && playerDimensions.width}
            >
              <ReactPlayer
                playing={autoPlay}
                controls
                light={!autoPlay ? thumbUri || imageUri : undefined}
                url={mediaUri}
                width="100%"
                height="100%"
                onEnded={() => {
                  handlePlayNext();
                }}
                volume={player.volume}
              />
            </ResizingPane>
          )}
        </div>
      )}
    </StyledItem>
  );
};

export default SelectedItem;
