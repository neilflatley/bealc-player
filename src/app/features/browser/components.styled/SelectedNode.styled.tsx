import styled from 'styled-components';

const StyledNode = styled.div`
  background: linear-gradient(
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.3)
  );
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: 100%;

  .info-panel {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 15px ${p => (p.fullWidth ? '15px' : '0')} 0 0;
    display: grid;
    grid-template-columns: ${p => (p.showImagePanel ? 'auto 1fr' : '1fr')};
    grid-template-rows: 1fr;
    padding: 10px 10px 2px 10px;
  }
  .info-panel .buttons {
    float: right;
  }

  .image-panel {
    padding: 0 10px 0 0;
  }

  .image-panel button:hover {
    opacity: 0.5;
  }

  img {
    border-radius: 15px;
    max-width: 100px;
    max-height: 200px;
  }

  @media ${({ theme }) => theme.mq.mobile} {
    .info-panel {
      border-radius: 15px 15px 0 0;
    }
    img {
      border-radius: 5px;
      max-width: 45px;
      max-height: 45px;
    }
    .description {
      display: none;
    }
  }
`;

export default StyledNode;
