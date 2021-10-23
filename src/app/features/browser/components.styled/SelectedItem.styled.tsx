import styled from 'styled-components';
const StyledDiv = styled.div``;

const StyledItem = styled(StyledDiv)`
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url(${({ imageUri }) => imageUri});
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;

  .media_player_container {
    flex-grow: 1;
    padding: 10px 10px 0 10px;
  }
  .media_player_container .resizable {
    background: #111;
    border: 1px solid white;
    border-radius: 15px;
    margin: auto;
    min-height: 56px;
    min-width: 120px;
    padding: 10px;
  }

  .item_info {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    display: grid;
    grid-template-columns: ${p => (p.thumbUri ? '110px 7fr' : '1fr')};
    opacity: 0.9;
    margin: 10px;
    padding: 10px 10px 5px 10px;
  }
  .item_info .thumb_column img {
    border-radius: 15px;
    width: 100px;
  }
  .info_column_main {
    font-size: 90%;
    grid-column: span 2;
    text-align: right;
  }
  .media-player-container {
    height: 100%;
    width: 100%;
  }
  @media ${({ theme }) => `${theme.mq.mobile}, ${theme.mq.tablet}`} {
    max-height: 50vh;
    .media_player_container {
      height: 75%;
    }
    .media-player-container {
      max-width: 100%;
    }
  }

  @media ${({ theme }) => `${theme.mq.mobile}, ${theme.mq.landscapeNarrow}`} {
    .item_info {
      grid-template-columns: ${p => (p.thumbUri ? '55px 7fr' : '1fr')};
    }
    .item_info .thumb_column {
      font-size: 80%;
    }
    .item_info .thumb_column img {
      border-radius: 5px;
      width: 45px;
    }
    .item_info .summary {
      display: none;
    }
  }

  .duration {
    font-size: 80%;
  }
  .summary {
    background: white;
    border-radius: 15px;
    max-height: 90px;
    overflow: auto;
    padding: 10px;
    text-align: justify;
    width: 100%;
  }
  .summary p {
    margin-block: 0.4em;
  }
`;

export default StyledItem;
