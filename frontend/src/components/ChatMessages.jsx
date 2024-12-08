import React, { useEffect, useRef } from 'react';

const ChatMessages = ({ messages, typingUsers, currentUser }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      className='ChatMessages'
      style={{ height: '300px', overflowY: 'scroll' }}
    >
      {messages.map((msg, index) => (
        <div
          className={`UserMessage ${
            msg.sender.name === currentUser ? 'right' : 'left'
          }`}
          key={index}
        >
          <b
            style={{
              color: msg.sender.name === currentUser ? '#31dede' : '#ff5555',
            }}
          >
            {msg.sender.name}
          </b>{' '}
          <br /> {msg.msg}
        </div>
      ))}

      {/* Typing users */}
      <div className='TypingMessage'>
        <p>
          {typingUsers
            .filter((user) => user.typing)
            .map((user) => `${user.username} is typing...`)
            .join(', ')}
        </p>
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
