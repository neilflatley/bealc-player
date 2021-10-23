import styled from 'styled-components';

const StyledScrollbar = styled.div`
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 12px;
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(90, 90, 90, 0.4);
    border-radius: 999px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }
`;

export default StyledScrollbar;
