import React from 'react';
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
  if (!title) return null;
  return (
    <div
      style={{
        background: `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), url(${imageUri})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        border: '2px solid black',
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
          textAlign: 'justify',
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
          <div>
            <span style={{ fontSize: '60%', color: '#ccc' }}>{local}</span>
          </div>
        </div>
        <div>
          <h2>{title}</h2>
          <h3>
            {album} [{year}] {artist && <span> - {artist}</span>}
            {duration && <span style={{ fontSize: '80%' }}> {duration}</span>}
          </h3>

          {summary && <p>{summary}</p>}
        </div>
      </div>
      {mediaUri && (
        <div style={{ padding: '10px 20px 20px 20px' }}>
          <ResizingPane
            storageId={0}
            sides={['top', 'bottom', 'right']}
            style={{
              background: '#111',
              border: '1px solid white',
              borderRadius: '15px',
              margin: 'auto',
              minHeight: '56px',
              minWidth: '240px',
              padding: '10px',
            }}
          >
            <ReactPlayer
              playing
              controls
              url={mediaUri}
              width="100%"
              height="100%"
            />
          </ResizingPane>
        </div>
      )}
    </div>
  );
};

export default SelectedItem;
