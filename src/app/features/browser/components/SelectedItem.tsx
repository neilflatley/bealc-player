import React, { useEffect, useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player';

import { PlayerProgress } from './ServerBrowser';
import Resizable from './Resizable';

import { togglePlayState } from '~/features/playlist/redux/actions';
import { symbols } from '~/theme/symbols';
import StyledItem from '../components.styled/SelectedItem.styled';

export type SelectedItemProps = {
  className: string;
  autoPlay: boolean;
  currentPlaylist: any[];
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
  handleSetPlayerType: (type: string) => void;
  handleVolume: (volume: number) => void;
  player: {
    isPlaying: boolean;
    volume: number;
  };
  seekTo: number;
  viewMode: number;
};

const SelectedItem = ({
  className,
  autoPlay,
  currentPlaylist,
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
  handlePlayNext,
  handleProgress,
  handleSetPlayerType,
  handleVolume,
  player,
  seekTo,
  viewMode,
}: SelectedItemProps) => {
  const [playerType, setPlayerType] = useState(
    ['mp3'].includes(format) ? 'audio' : 'video'
  );
  const [lastPlayedSrc, setLastPlayedSrc] = useState<string>();
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
        height: parentHeight - 10,
      });
    }
  }, [parentRef, mediaUri]);

  useEffect(() => {
    let type = 'video';
    if (['flac', 'mp3', 'ogg'].includes(format)) {
      type = 'audio';
    }
    setPlayerType(type);
    handleSetPlayerType(type);
  }, [format]);

  useEffect(() => {
    if (audioPlayerRef?.audioEl.current)
      setAudioPlayer(audioPlayerRef.audioEl.current);
  }, [audioPlayerRef]);

  useEffect(() => {
    if (audioPlayer) {
      const url = audioPlayer.src ? new URL(audioPlayer.src) : '';
      const audioUrl = url && `${url.pathname}${url.search}`;
      if (mediaUri && mediaUri !== lastPlayedSrc && audioUrl !== mediaUri) {
        audioPlayer.src = mediaUri;
        audioPlayer.onended = async () => {
          setLastPlayedSrc(mediaUri);
          const i = currentPlaylist.findIndex(i => i.isPlaying);
          const nextSrc =
            currentPlaylist.length > i + 1
              ? currentPlaylist[i + 1].mediaUri
              : '';
          console.info(`nextSrc = ${nextSrc}`);
          if (nextSrc) {
            audioPlayer.src = nextSrc;
            if (audioPlayer.paused) await audioPlayer.play();
          }
          handlePlayNext();
          // setTimeout(() => {
          // }, 1000);
        };
        if (player.isPlaying && audioPlayer.paused) audioPlayer.play();
        //else audioPlayer.pause();
      }
    }
  }, [audioPlayer, player.isPlaying, mediaUri]);

  useEffect(() => {
    if (audioPlayer) {
      if (player.isPlaying) {
        if (audioPlayer.paused) {
          audioPlayer.play();
        }
      } else {
        // if (!audioPlayer.paused) {
        audioPlayer.pause();
        // }
      }
    }
  }, [audioPlayer, player.isPlaying]);

  useEffect(() => {
    if (audioPlayer) {
      if (typeof audioProgress !== 'undefined') handleProgress(audioProgress);
    }
  }, [audioPlayer, audioProgress]);

  useEffect(() => {
    const nextTime = seekTo;
    if (isFinite(nextTime) & seekTo > 0) {
      if (audioPlayer) {
        console.info(`audioPlayer.currentTime = ${nextTime}`);
        audioPlayer.currentTime = nextTime;
      }
      if (playerRef) playerRef.seekTo(seekTo);
    }
  }, [audioPlayer, seekTo]);

  if (!title) return null;

  const ResizablePane = Resizable(false);

  const MediaFormatButtons = () => (
    <>
      {playerType === 'audio' && (
        <span>
          <button
            className="link-button"
            onClick={e => {
              e.preventDefault();
              setAudioPlayerControls(!audioPlayerControls);
            }}
            title={`${!audioPlayerControls ? 'Show' : 'Hide'} player controls}`}
          >
            {symbols.controls}
          </button>
          {' | '}
        </span>
      )}
      <button
        className="link-button"
        onClick={e => {
          e.preventDefault();
          const nextType = playerType === 'video' ? 'audio' : 'video';
          setPlayerType(nextType);
          handleSetPlayerType(nextType);
        }}
        title={`Use ${playerType === 'video' ? 'audio' : 'video'} player`}
      >
        {playerType === 'video' ? symbols.video : symbols.audio}
      </button>
      {' | '}
      {format && (
        <span className="format" title={`${videoCodec} / ${audioCodec}`}>
          {' '}
          {format}
        </span>
      )}
    </>
  );

  return (
    <StyledItem
      className={className}
      imageUri={imageUri}
      thumbUri={thumbUri}
      playerType={playerType}
    >
      {mediaUri && (
        <div
          className="media_player_container"
          style={{
            display:
              playerType !== 'audio' || audioPlayerControls ? 'block' : 'none',
          }}
        >
          <div className="media-player-container" ref={parentRef}>
            {playerDimensions.width && playerType === 'audio' ? (
              <div
                className="resizable"
                style={{
                  paddingTop: '16px',
                }}
              >
                <ReactAudioPlayer
                  // src={mediaUri}
                  autoPlay={false}
                  controls={audioPlayerControls}
                  listenInterval={1000}
                  onError={error => {
                    console.log(error);
                    handlePlayNext();
                  }}
                  // onEnded={() => {
                  //   if (!playingSrc) handlePlayNext();
                  // }}
                  onListen={time => {
                    setAudioProgress({
                      played: time / (audioPlayer?.duration || 0),
                      playedSeconds: time,
                      loaded:
                        ((audioPlayer?.readyState &&
                          audioPlayer?.buffered.end(
                            audioPlayer?.buffered.length - 1
                          )) ||
                          0) / (audioPlayer?.duration || 0),
                      loadedSeconds:
                        (audioPlayer?.readyState &&
                          audioPlayer?.buffered.end(
                            audioPlayer?.buffered.length - 1
                          )) ||
                        0,
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
            ) : null}
            {playerDimensions.width && playerType === 'video' ? (
              <ResizablePane
                className="resizable"
                sides={['top', 'bottom', 'left', 'right']}
                height={playerDimensions.height}
                width={playerDimensions.width && playerDimensions.width}
                style={{
                  height: '100%',
                }}
              >
                <ReactPlayer
                  ref={player => setPlayerRef(player)}
                  controls={true}
                  light={!autoPlay ? thumbUri || imageUri : undefined}
                  playing={player.isPlaying}
                  url={mediaUri}
                  height="100%"
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
              </ResizablePane>
            ) : null}
          </div>
        </div>
      )}
      <div className="item_info">
        {thumbUri && (
          <div className="thumb_column">
            <img key={thumbUri} src={thumbUri} alt={title} />
            {/* {[2].includes(viewMode) ? (
              <div>
                <MediaFormatButtons />
              </div>
            ) : null} */}
          </div>
        )}
        <div className="info_column">
          <h2>{title}</h2>
          <h3>
            {album} {year && `[${year}]`} {artist && <span> - {artist}</span>}
          </h3>
          {duration && <span className="duration"> {duration}</span>}{' '}
          {/* {[0, 1].includes(viewMode) ? <MediaFormatButtons /> : null} */}
          <MediaFormatButtons />
          {summary && (
            <div className="summary">
              <p>{summary}</p>
            </div>
          )}
        </div>
      </div>
    </StyledItem>
  );
};

export default SelectedItem;
