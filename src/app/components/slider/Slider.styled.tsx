import React from 'react';
import ReactSlider from 'react-slider';

import styled from 'styled-components';

export const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: ${p => (p.height ? p.height : '12px')};
`;

export const StyledThumb = styled.div`
  height: ${p => (p.size ? p.size : '20px')};
  line-height: ${p => (p.size ? p.size : '20px')};
  width: ${p => (p.size ? p.size : '20px')};
  text-align: center;
  background-color: #555;
  color: #fff;
  border-radius: 50%;
  cursor: grab;
  top: ${p => (p.topOffset ? p.topOffset : '-4px')};
  left: -10px;
`;

export const Thumb = (props, state) => <StyledThumb {...props}></StyledThumb>;

export const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${props =>
    props.index === 0
      ? '#1db954'
      : props.index === 1 && props.style.left && props.style.right
      ? '#0c4d23'
      : 'rgba(0,0,0,0.1)'};
  border-radius: 99px;
`;

export const Track = (props, state) => (
  <StyledTrack {...props} index={state.index} />
);
