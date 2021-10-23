import styled from 'styled-components';

const StyledPlayer = styled.div`
  height: 100%;
  background: linear-gradient(rgba(77, 108, 136, 0.8), rgba(177, 122, 87, 0.8));

  .logo {
    float: right;
    margin: 10px 10px 0 0;
  }
  .servers_tabs {
    background: rgba(0, 0, 0, 0.3);
    color: #bebebe;
    height: calc(100% - 34px);
    margin: 0 auto;
    padding: 20px;
  }
  .login_container {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 25px;
    margin: 4px;
    padding: 0 10px;
  }
  .login_container p {
    margin-block: 0.4em;
  }
  .login_container button {
    background: none;
    border: 0;
    cursor: pointer;
    padding: 7px;
  }

  .play-button {
    width: 25px;
    height: 25px;
    padding: 0 0 2px 2px;
    border-radius: 12px;
  }

  .play-button:hover {
    background-color: #069;
    color: #eee;
    border: 1px solid #eee;
    opacity: 0.8;
    text-decoration: none;
  }

  .menu-button {
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 999px;
    color: #1db954;
    height: 4rem;
    margin: 0 auto;
    padding: 7px;
    width: 100%;
  }
`;

export default StyledPlayer;
