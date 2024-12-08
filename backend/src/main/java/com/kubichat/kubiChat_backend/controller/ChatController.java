package com.kubichat.kubiChat_backend.controller;

import com.kubichat.kubiChat_backend.model.Message;
import com.kubichat.kubiChat_backend.model.TypingStatus;
import com.kubichat.kubiChat_backend.model.User;
import com.kubichat.kubiChat_backend.service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Date;

@Controller
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(ChatService chatService, SimpMessagingTemplate messagingTemplate) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(Message message) {
        messagingTemplate.convertAndSend("/room/" + message.getRoomId(), message);
    }

    @MessageMapping("/chat.addUser")
    public void addUser(Message message) {
        message.setType(Message.MessageType.JOIN);
        messagingTemplate.convertAndSend("/room/" + message.getRoomId(), message);
    }
    @MessageMapping("/chat.typing")
    public void handleTypingStatus(TypingStatus status) {
        messagingTemplate.convertAndSend(
                "/room/" + status.getRoomId() + "/typing", // typing kanalına mesajı yayınla
                status
        );
    }

}
