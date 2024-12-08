package com.kubichat.kubiChat_backend.model;

import lombok.Data;

import java.util.Date;
@Data
public class Message {
    private User sender;
    private String msg;
    private int roomId;
    private Date sentDate;
    private MessageType type;
    public enum MessageType{
        CHAT,JOIN,LEAVE,TYPING
    }
}
