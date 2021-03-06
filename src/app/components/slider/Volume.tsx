import React from 'react';
import { StyledSlider, Thumb, Track } from './Slider.styled';

type Props = {
  volume: number;
  onChange: (volume: number | readonly number[], index: number) => void;
  styling: {
    width?: string;
    height?: string;
    thumbSize?: string;
    thumbOffset?: string;
  };
};

const Volume = ({
  volume,
  onChange,
  styling: {
    width = '100px',
    height = '8px',
    thumbSize = '14px',
    thumbOffset = '-3px',
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
      step={0.05}
      value={volume}
      width={width}
      height={height}
    />
  );
};

export default Volume;
