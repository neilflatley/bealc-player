import React from 'react';
import ReactSlider from 'react-slider';

import styled from 'styled-components';

export const StyledSlider = styled(ReactSlider)`
  width: 200px;
  height: 12px;
`;

export const StyledThumb = styled.div`
  height: 20px;
  line-height: 20px;
  width: 20px;
  text-align: center;
  background-color: rgba(30, 30, 30, 0.8);
  color: #fff;
  border-radius: 50%;
  cursor: grab;
  position: relative;
  top: -4px;

  :hover {
    background-color: #069;
  }
`;

export const Thumb = (props, state) => <StyledThumb {...props}></StyledThumb>;

export const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${props =>
    props.index === 2
      ? '#f00'
      : props.index === 1
      ? 'rgba(0,0,0,0.1)'
      : '#1db954'};
  border-radius: 999px;
`;

export const Track = (props, state) => (
  <StyledTrack {...props} index={state.index} />
);
