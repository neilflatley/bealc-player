import React, { useEffect, useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player';
import ResizingPane from 'react-resizing-pane';
import StyledItem from '../components.styled/SelectedItem.styled';
import MediaLinkModal from '../../../components/MediaLinkModal';

export type SelectedItemProps = {
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
};

const SelectedItem = ({
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
}: SelectedItemProps) => {
  const [player, setPlayer] = useState(
    ['mp3'].includes(format) ? 'audio' : 'video'
  );

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
    if (['mp3'].includes(format) ? 'audio' : 'video') setPlayer('audio');
  }, [format]);

  if (!title) return null;
  return (
    <StyledItem imageUri={imageUri}>
      <div className="item_info">
        <div className="thumb_column">
          {thumbUri && <img key={thumbUri} src={thumbUri} alt={title} />}
        </div>
        <div className="info_column">
          <div className="info_column_main">
            <span style={{ color: '#ccc' }}>{local}</span>
            <button
              className="link-button"
              onClick={e => {
                e.preventDefault();
                setPlayer(player === 'video' ? 'audio' : 'video');
              }}
            >
              Use {player === 'video' ? 'audio' : 'video'} player
            </button>
            <MediaLinkModal uri={mediaUri} />
          </div>
          <h2>{title}</h2>
          <h3>
            {album} [{year}] {artist && <span> - {artist}</span>}
            {duration && <span className="duration"> {duration}</span>}
            {format && (
              <span className="format" title={`${videoCodec} / ${audioCodec}`}>
                {' '}
                {format}
              </span>
            )}
          </h3>

          {summary && (
            <div className="summary">
              <p>{summary}</p>
            </div>
          )}
        </div>
      </div>
      {mediaUri && (
        <div className="media_player_container" ref={parentRef}>
          {playerDimensions.width && player === 'audio' && (
            <div className="resizable" style={{ paddingTop: '16px' }}>
              <ReactAudioPlayer
                src={mediaUri}
                autoPlay
                controls
                style={{ width: '100%' }}
              />
            </div>
          )}
          {playerDimensions.width && player === 'video' && (
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
              />
            </ResizingPane>
          )}
        </div>
      )}
    </StyledItem>
  );
};

export default SelectedItem;
