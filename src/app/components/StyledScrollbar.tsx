import styled from 'styled-components';

const StyledScrollbar = styled.div`
  overflow-y: auto;
  overflow-x: none;

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(90, 90, 90, 0.8);
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export default StyledScrollbar;
