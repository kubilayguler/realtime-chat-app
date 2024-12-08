import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const connectWebSocket = (
  roomId,
  username,
  setMessages,
  setTypingUsers
) => {
  const socket = new SockJS('http://localhost:8443/ws');
  const stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    stompClient.subscribe(`/room/${roomId}`, (message) => {
      const newMessage = JSON.parse(message.body);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    stompClient.subscribe(`/room/${roomId}/typing`, (message) => {
      const { username: typingUser, typing } = JSON.parse(message.body);
      setTypingUsers((prevTypingUsers) => {
        const userIndex = prevTypingUsers.findIndex(
          (user) => user.username === typingUser && user.roomId === roomId
        );

        if (userIndex !== -1) {
          const updatedTypingUsers = [...prevTypingUsers];
          updatedTypingUsers[userIndex] = {
            ...updatedTypingUsers[userIndex],
            typing,
          };
          return updatedTypingUsers;
        } else {
          return typing
            ? [...prevTypingUsers, { username: typingUser, roomId, typing }]
            : prevTypingUsers;
        }
      });
    });
  });

  return stompClient;
};
