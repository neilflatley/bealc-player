import React, { useEffect, useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player';
import ResizingPane from 'react-resizing-pane';
import { togglePlayState } from '~/features/playlist/redux/actions';
import StyledItem from '../components.styled/SelectedItem.styled';
import { PlayerProgress } from './ServerBrowser';

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
  handleProgress: (progress: PlayerProgress) => void;
  handleVolume: (volume: number) => void;
  player: {
    isPlaying: boolean;
    volume: number;
  };
  seekTo: number;
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
  handleProgress,
  handleVolume,
  player,
  seekTo,
}: SelectedItemProps) => {
  const [playerType, setPlayerType] = useState(
    ['mp3'].includes(format) ? 'audio' : 'video'
  );
  const [playerRef, setPlayerRef] = useState<ReactPlayer>();
  const [audioPlayerRef, setAudioPlayerRef] = useState<ReactAudioPlayer>();
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement>();
  const [audioPlayerControls, setAudioPlayerControls] = useState(false);
  const [audioProgress, setAudioProgress] = useState<PlayerProgress>();

  const [playerDimensions, setPlayerDimensions] = useState({
    width: 0,
    height: 0,
  });

  const parentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.offsetHeight;
      const parentWidth = parentRef.current.offsetWidth;
      setPlayerDimensions({
        width: parentWidth - 20,
        height: parentHeight - 160,
      });
    }
  }, [parentRef, mediaUri]);

  useEffect(() => {
    if (['mp3'].includes(format)) setPlayerType('audio');
    else setPlayerType('video');
  }, [format]);

  useEffect(() => {
    if (audioPlayerRef?.audioEl.current)
      setAudioPlayer(audioPlayerRef.audioEl.current);
  }, [audioPlayerRef]);

  useEffect(() => {
    return () => {
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.src = '';
        audioPlayer.load();
      }
    };
  }, []);

  useEffect(() => {
    if (audioPlayer) {
      if (player.isPlaying) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
      if (typeof audioProgress !== 'undefined') handleProgress(audioProgress);
    }
  }, [audioPlayer, player.isPlaying, audioProgress]);

  useEffect(() => {
    const nextTime = seekTo;
    if (isFinite(nextTime)) {
      if (audioPlayer) audioPlayer.currentTime = nextTime;
      if (playerRef) playerRef.seekTo(seekTo);
    }
  }, [audioPlayer, seekTo]);

  if (!title) return null;
  return (
    <StyledItem imageUri={imageUri} thumbUri={thumbUri} className={className}>
      <div className="item_info">
        {thumbUri && (
          <div className="thumb_column">
            <img key={thumbUri} src={thumbUri} alt={title} />
          </div>
        )}
        <div className="info_column">
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
        <div className="info_column_main">
          {playerType === 'audio' && (
            <button
              className="link-button"
              onClick={e => {
                e.preventDefault();
                setAudioPlayerControls(!audioPlayerControls);
              }}
            >
              {!audioPlayerControls ? 'Show' : 'Hide'} player controls
            </button>
          )}
          {' | '}
          <button
            className="link-button"
            onClick={e => {
              e.preventDefault();
              setPlayerType(playerType === 'video' ? 'audio' : 'video');
            }}
          >
            Use {playerType === 'video' ? 'audio' : 'video'} player
          </button>
          {' | '}
          {format && (
            <span className="format" title={`${videoCodec} / ${audioCodec}`}>
              {' '}
              {format}
            </span>
          )}
        </div>
      </div>
      {mediaUri && (
        <div
          className="media_player_container"
          ref={parentRef}
          style={{
            display: audioPlayerControls ? 'block' : 'none',
          }}
        >
          {playerDimensions.width && playerType === 'audio' && (
            <div
              className="resizable"
              style={{
                paddingTop: '16px',
              }}
            >
              <ReactAudioPlayer
                src={mediaUri}
                autoPlay
                controls={audioPlayerControls}
                listenInterval={1000}
                onError={error => {
                  console.log(error);
                  togglePlayState(error);
                }}
                onEnded={() => {
                  handlePlayNext();
                }}
                onListen={time => {
                  setAudioProgress({
                    played: time / (audioPlayer?.duration || 0),
                    playedSeconds: time,
                    loaded:
                      (audioPlayer?.buffered.end(
                        audioPlayer?.buffered.length - 1
                      ) || 0) / (audioPlayer?.duration || 0),
                    loadedSeconds:
                      audioPlayer?.buffered.end(
                        audioPlayer?.buffered.length - 1
                      ) || 0,
                    duration: audioPlayer?.duration || 0,
                  });
                }}
                onVolumeChanged={e => {
                  handleVolume(e.target?.volume || 0);
                }}
                ref={el => setAudioPlayerRef(el)}
                style={{ width: '100%' }}
                volume={player.volume}
              />
            </div>
          )}
          {playerDimensions.width && playerType === 'video' && (
            <ResizingPane
              className="resizable"
              sides={['top', 'bottom', 'left', 'right']}
              height={playerDimensions.height}
              width={playerDimensions.width && playerDimensions.width}
            >
              <ReactPlayer
                ref={player => setPlayerRef(player)}
                controls
                light={!autoPlay ? thumbUri || imageUri : undefined}
                playing={player.isPlaying}
                url={mediaUri}
                width="100%"
                onDuration={duration => {
                  handleProgress({ duration });
                }}
                onEnded={() => {
                  handlePlayNext();
                }}
                onProgress={progress => {
                  handleProgress(progress);
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