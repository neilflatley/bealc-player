import React, { useEffect, useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player';
import ResizingPane from 'react-resizing-pane';

export type SelectedItemProps = {
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
  local: 'local' | 'remote';
};

const SelectedItem = ({
  imageUri,
  thumbUri,
  mediaUri,
  title,
  artist,
  album,
  summary,
  year,
  duration,
  local,
}: SelectedItemProps) => {
  const [player, setPlayer] = useState('video');
  const [copyText, setCopyText] = useState('Copy VLC link');
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
        width: parentWidth - 40,
        height: parentHeight - 40,
      });
    }
  }, [parentRef]);
  if (!title) return null;
  return (
    <div
      style={{
        background: `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url(${imageUri})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        border: '2px solid black',
        // borderRadius: '5px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '160px 7fr',
          background: 'white',
          border: '3px solid #555',
          borderRadius: '15px',
          opacity: '0.9',
          margin: '20px 20px 10px 20px',
          padding: '0 30px 20px 0',
        }}
      >
        <div style={{ margin: '20px' }}>
          {thumbUri && (
            <img
              key={thumbUri}
              src={thumbUri}
              style={{ width: '120px' }}
              alt={title}
            />
          )}
        </div>
        <div>
          <div style={{ fontSize: '60%', float: 'right', padding: '10px 0' }}>
            <span style={{ color: '#ccc' }}>{local}</span>
            <button
              onClick={e => {
                e.preventDefault();
                setPlayer(player === 'video' ? 'audio' : 'video');
              }}
            >
              Use {player === 'video' ? 'audio' : 'video'} player
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.protocol}//${window.location.hostname}:${window.location.port}${mediaUri}`
                );
                setCopyText('Link copied');
              }}
            >
              {copyText}
            </button>
          </div>
          <h2>{title}</h2>
          <h3>
            {album} [{year}] {artist && <span> - {artist}</span>}
            {duration && <span style={{ fontSize: '80%' }}> {duration}</span>}
          </h3>

          {summary && <p style={{ textAlign: 'justify' }}>{summary}</p>}
        </div>
      </div>
      {mediaUri && (
        <div style={{ padding: '10px 20px 20px 20px' }} ref={parentRef}>
          {playerDimensions.width && (
            <ResizingPane
              storageId={0}
              sides={['top', 'bottom', 'left', 'right']}
              style={{
                background: '#111',
                border: '1px solid white',
                borderRadius: '15px',
                margin: 'auto',
                minHeight: '56px',
                padding: '10px',
              }}
              width={playerDimensions.width && playerDimensions.width}
            >
              {player === 'audio' && (
                <ReactAudioPlayer
                  src={mediaUri}
                  autoPlay
                  controls
                  style={{ height: '100%', width: '100%' }}
                />
              )}
              {player === 'video' && (
                <ReactPlayer
                  playing
                  controls
                  light={thumbUri || imageUri}
                  url={mediaUri}
                  width="100%"
                  height="100%"
                />
              )}
            </ResizingPane>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectedItem;
