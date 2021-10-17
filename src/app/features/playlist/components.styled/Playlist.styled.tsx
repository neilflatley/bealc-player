import styled from 'styled-components';
import StyledScrollbar from '~/components/StyledScrollbar';

const StyledPlaylist = styled(StyledScrollbar)`
  background: linear-gradient(
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.3)
  );
  height: 100%;
  overflow: auto;
  padding: 10px 20px 60px 10px;

  #hide {
    float: right;
  }

  .playlist-item {
    width: max-content;
  }
`;

export default StyledPlaylist;
