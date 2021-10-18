import React from 'react';
import ReactSlider from 'react-slider';

import styled from 'styled-components';

export const StyledSlider = styled(ReactSlider)`
  width: ${p => (p.width ? p.width : '200px')};
  height: ${p => (p.height ? p.height : '12px')};
`;

export const StyledThumb = styled.div`
  height: ${p => (p.size ? p.size : '20px')};
  line-height: ${p => (p.size ? p.size : '20px')};
  width: ${p => (p.size ? p.size : '20px')};
  text-align: center;
  background-color: rgba(30, 30, 30, 0.8);
  color: #fff;
  border-radius: 50%;
  cursor: grab;
  position: relative;
  top: ${p => (p.topOffset ? p.topOffset : '-4px')};
  left: 3px;
`;

export const Thumb = (props, state) => <StyledThumb {...props}></StyledThumb>;

export const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${props =>
    props.index === 0
      ? '#1db954'
      : props.index === 1 && props.style.left && props.style.right
      ? '#1dee54'
      : 'rgba(0,0,0,0.1)'};
  border-radius: ${props =>
    props.style.left && !props.style.right
      ? '0 99px 99px 0'
      : props.index === 0 && props.style.right
      ? '99px 0 0 99px'
      : props.style.left && props.style.right
      ? '0px'
      : '99px'};
`;

export const Track = (props, state) => (
  <StyledTrack {...props} index={state.index} />
);
