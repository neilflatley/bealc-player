import styled from 'styled-components';

const StyledPlaylist = styled.div`
  background: linear-gradient(
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.3)
  );
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: 100%;
  padding: 10px;

  .buttons-container {
    float: right;
  }

  .playlist-item {
    width: max-content;
  }

  .artist {
    color: #444;
  }
`;

export default StyledPlaylist;
