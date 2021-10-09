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
  border-radius: 0 15px 15px 0;

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
  .duration {
    font-size: 80%;
  }
  .summary {
    background: white;
    border-radius: 15px;
    height: 90px;
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
    height: 100%;
  }
  .media_player_container .resizable {
    background: #111;
    border: 1px solid white;
    border-radius: 15px;
    margin: auto;
    min-height: 56px;
    padding: 10px;
  }
`;

export default StyledItem;
