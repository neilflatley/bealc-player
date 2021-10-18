import React from 'react';
import { StyledSlider, Thumb, Track } from './Slider.styled';

type Props = {
  played: number;
  loaded: number;
  onChange: (volume: number | readonly number[], index: number) => void;
  styling?: {
    width?: string;
    height?: string;
    thumbSize?: string;
    thumbOffset?: string;
  };
};

const Progress = ({
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
  return (
    <StyledSlider
      min={0}
      max={1}
      onChange={onChange}
      renderTrack={Track}
      renderThumb={(p, s) =>
        Thumb({ ...p, size: thumbSize, topOffset: thumbOffset }, s)
      }
      step={0.01}
      value={[played, loaded]}
      width={width}
      height={height}
    />
  );
};

export default Progress;
