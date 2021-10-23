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
    border-radius: 15px 0 0 0;
    display: grid;
    grid-template-columns: ${p => (p.imageUri ? 'auto 1fr' : '1fr')};
    grid-template-rows: 1fr;
    padding: 10px;
  }

  .image-panel {
    padding: 0 10px 0 0;
  }

  img {
    border-radius: 15px;
    max-width: 100%;
    max-height: 200px;
  }

  @media (max-width: 650px) {
    .info-panel {
      border-radius: 15px 15px 0 0;
    }
    img {
      max-height: 50px;
    }
    .description {
      display: none;
    }
  }

  .library-item {
    width: max-content;
  }

  .playlist-button {
    border: none;
    background: rgba(0, 0, 0, 0.5);
    color: #1db954;
    width: 47% !important;
    margin: 0 1%;
  }
`;

export default StyledNode;
