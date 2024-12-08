package com.kubichat.kubiChat_backend.model;

import lombok.Data;

import java.util.List;
@Data
public class Room {
    private int id;
    private String name;
    private List<User> users;
}
