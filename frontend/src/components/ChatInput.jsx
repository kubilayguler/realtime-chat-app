import React, { useState } from 'react';

const ChatInput = ({ client, roomId, username }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleTyping = (value) => {
    if (value.trim() !== '' && !isTyping) {
      setIsTyping(true);
      client.send(
        '/app/chat.typing',
        {},
        JSON.stringify({ roomId, username, typing: true })
      );
    } else if (value.trim() === '' && isTyping) {
      setIsTyping(false);
      client.send(
        '/app/chat.typing',
        {},
        JSON.stringify({ roomId, username, typing: false })
      );
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      client.send(
        '/app/chat.sendMessage',
        {},
        JSON.stringify({
          sender: { name: username },
          msg: message,
          roomId,
          type: 'CHAT',
        })
      );
      setMessage('');
      setIsTyping(false);
      client.send(
        '/app/chat.typing',
        {},
        JSON.stringify({ roomId, username, typing: false })
      );
    }
  };

  return (
    <div className='ChatInput'>
      <input
        type='text'
        value={message}
        onChange={(e) => {
          const value = e.target.value;
          setMessage(value);
          handleTyping(value);
        }}
        placeholder='Type a message...'
      />
      <button onClick={handleSendMessage}>→</button>
    </div>
  );
};
export default ChatInput;
