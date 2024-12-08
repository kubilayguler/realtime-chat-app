import React, { useState } from 'react';

const UserJoin = ({ onConnect }) => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');

  const handleSubmit = () => {
    if (username && roomId) {
      onConnect(roomId, username);
    }
  };

  return (
    <div className='UserJoin'>
      <input
        type='text'
        placeholder='Enter username..'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='text'
        placeholder='Enter roomID..'
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={handleSubmit}>Connect</button>
    </div>
  );
};

export default UserJoin;
