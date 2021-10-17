import React from 'react';
import { StyledSlider, Thumb, Track } from './Slider.styled';

type Props = {
  volume: number;
  onChange: (volume: number | readonly number[], index: number) => void;
};

const Volume = ({ volume, onChange }: Props) => {
  return (
    <StyledSlider
      min={0}
      max={1}
      onChange={onChange}
      renderTrack={Track}
      renderThumb={Thumb}
      step={0.05}
      value={volume}
    />
  );
};

export default Volume;
