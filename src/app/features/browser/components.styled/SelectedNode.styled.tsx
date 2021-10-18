import styled from 'styled-components';
import StyledScrollbar from '~/components/StyledScrollbar';

const StyledNode = styled(StyledScrollbar)`
  background: linear-gradient(
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.3)
  );
  height: 100%;
  overflow: auto;
  padding: 10px 20px;

  img {
    max-width: 100%;
    max-height: 200px;
  }
  @media (max-width: 650px) {
    img {
      max-height: 100px;
    }
    .description {
      display: none;
    }
  }

  .library-item {
    width: max-content;
  }

  .playlist-button {
    border: 1px solid #eee;
    background: rgba(0, 0, 0, 0.5);
    color: #1db954;
    width: 47% !important;
    margin: 0 1%;
  }
`;

export default StyledNode;
