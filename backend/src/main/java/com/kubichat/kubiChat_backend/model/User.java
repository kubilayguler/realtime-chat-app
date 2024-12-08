package com.kubichat.kubiChat_backend.model;


import lombok.Data;

import java.util.List;

@Data
public class User {
    private long id;
    private String name;
    private List<Message> messages;


}
