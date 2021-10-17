import styled from 'styled-components';
import StyledScrollbar from '~/components/StyledScrollbar';

const StyledNode = styled(StyledScrollbar)`
  background: linear-gradient(
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.3)
  );
  border-radius: 15px 0 0 15px;
  height: 100%;
  overflow: auto;
  padding: 10px 20px;

  img {
    max-width: 100%;
    max-height: 200px;
  }

  .library-item {
    width: max-content;
  }

  .playlist-button {
    border: 1px solid #eee;
    width: 50% !important;
  }
`;

export default StyledNode;
