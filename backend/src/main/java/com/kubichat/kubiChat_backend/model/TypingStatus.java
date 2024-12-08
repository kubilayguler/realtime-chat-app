package com.kubichat.kubiChat_backend.model;

import lombok.Data;

@Data
public class TypingStatus {
    private String username;
    private int roomId;
    private boolean typing;

}

