import styled from 'styled-components';

const StyledNode = styled.div`
  background: linear-gradient(
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 15px 0 0 15px;
  height: 100%;
  overflow: auto;
  padding: 10px 20px;

  img {
    object-fit: cover;
    width: 100%;
    max-height: 200px;
  }

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

export default StyledNode;
