import React from 'react';
import { StyledSlider, Thumb, Track } from './Slider.styled';

import styled from 'styled-components';

export const StyledPlayedSlider = styled(StyledSlider)`
  z-index: 10;
`;

const StyledBufferedSlider = styled(StyledSlider)`
  top: ${p => (p.height ? `-${p.height}` : '-12px')};
`;

const StyledBufferedTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${props => (props.index === 0 ? 'rgba(0,0,0,0.1)' : 'none')};
  border-radius: 99px;
`;

type Props = {
  duration?: number;
  played: number;
  loaded: number;
  onChange: (nextValue: number | readonly number[], index: number) => void;
  styling?: {
    width?: string;
    height?: string;
    thumbSize?: string;
    thumbOffset?: string;
  };
};

const Progress = ({
  duration,
  played,
  loaded,
  onChange,
  styling: {
    width = '200px',
    height = '14px',
    thumbSize = '16px',
    thumbOffset = '-1px',
  } = {},
}: Props) => {
  const containerRef = React.useRef();
  const sliderRef = React.useRef();
  React.useEffect(() => {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      sliderRef.current?.resize();
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      containerRef.current && resizeObserver.unobserve(containerRef.current);
    };
  });

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr' }}
    >
      <StyledPlayedSlider
        ref={sliderRef}
        min={0}
        max={duration || 1}
        onChange={onChange}
        renderThumb={(p, s) =>
          Thumb({ ...p, size: thumbSize, topOffset: thumbOffset }, s)
        }
        renderTrack={Track}
        step={0.01}
        value={played}
        width={width}
        height={height}
        style={{
          backgroundColor: 'rgba(0,0,0,0.3)',
          gridRowStart: 1,
          gridColumnStart: 1,
        }}
      />
      {loaded ? (
        <StyledBufferedSlider
          min={0}
          max={duration || 1}
          disabled={true}
          renderThumb={(p, s) =>
            Thumb({ ...p, size: '0px', topOffset: '0px' }, s)
          }
          renderTrack={(props, state) => (
            <StyledBufferedTrack {...props} index={state.index} />
          )}
          step={0.01}
          value={loaded}
          width={width}
          height={height}
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            gridRowStart: 1,
            gridColumnStart: 1,
          }}
        />
      ) : null}
    </div>
  );
};

export default Progress;
