import React, { useState } from 'react';

const Login = ({ submit }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
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
        onClick={() => {
          submit(user, password);
        }}
      >
        Search for Plex Servers
      </button>
    </div>
  );
};

export default Login;
