import styled from 'styled-components';

const StyledItem = styled.div`
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url(${({ imageUri }) => imageUri});
  background-position: center;
  background-size: cover;
  /* border: 2px solid black; */

  .item_info {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    display: grid;
    grid-template-columns: 110px 7fr;
    opacity: 0.9;
    margin: 10px;
    padding: 10px 10px 4px 10px;
  }
  .item_info .thumb_column img {
    border-radius: 15px;
    width: 100px;
  }
  .item_info .info_column_main {
    font-size: 90%;
    float: right;
  }

  @media (max-width: 650px) {
    .item_info {
      grid-template-columns: 60px 7fr;
    }
    .item_info .thumb_column img {
      width: 50px;
    }
    .item_info .duration,
    .summary {
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

  .media_player_container {
    padding: 0 10px 20px 10px;
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
`;

export default StyledItem;
