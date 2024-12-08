import React, { useState } from 'react';
import UserJoin from './components/UserJoin';
import ChatRoom from './components/ChatRoom';
import './App.css';

function App() {
  const [connected, setConnected] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [username, setUsername] = useState(null);

  return (
    <div className='App'>
      {!connected ? (
        <UserJoin
          onConnect={(roomId, username) => {
            setRoomId(roomId);
            setUsername(username);
            setConnected(true);
          }}
        />
      ) : (
        <ChatRoom roomId={roomId} username={username} />
      )}
    </div>
  );
}

export default App;
