import React, { useEffect, useState } from 'react';
import { getPlexServersCookie } from '../util';

const Login = ({ submit, signOut, devices }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [servers, setServers] = useState(getPlexServersCookie());

  useEffect(() => {
    setServers(getPlexServersCookie());
  }, [devices]);

  if (servers?.accessToken)
    return (
      <p>
        Signed into plex.tv{': '}
        <button
          id="btn"
          className="link-button"
          onClick={() => {
            signOut();
          }}
        >
          sign out
        </button>
      </p>
    );
  return (
    <div>
      <input
        type="text"
        id="user"
        onChange={e => setUser(e.target.value)}
        placeholder="plex.tv username"
      ></input>
      <input
        type="text"
        id="password"
        onChange={e => setPassword(e.target.value)}
        placeholder="plex.tv password"
      ></input>
      <button
        id="btn"
        className="link-button"
        onClick={() => {
          submit(user, password);
        }}
      >
        Login to plex.tv
      </button>
    </div>
  );
};

export default Login;
