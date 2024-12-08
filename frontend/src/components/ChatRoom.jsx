import React, { useState, useEffect } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { connectWebSocket } from '../utils/websocket';

const ChatRoom = ({ roomId, username }) => {
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    const stompClient = connectWebSocket(
      roomId,
      username,
      setMessages,
      setTypingUsers
    );
    setClient(stompClient);

    return () => {
      stompClient.disconnect();
    };
  }, [roomId, username]);

  return (
    <div className='ChatRoom bg-image'>
      <ChatMessages
        messages={messages}
        typingUsers={typingUsers}
        currentUser={username}
      />
      <ChatInput client={client} roomId={roomId} username={username} />
    </div>
  );
};

export default ChatRoom;
