package com.kubichat.kubiChat_backend.service;

import com.kubichat.kubiChat_backend.model.Room;
import com.kubichat.kubiChat_backend.model.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {
    private final Map<Integer, Room> rooms = new HashMap<>();

    public Room getRoom(int roomId) {
        return rooms.computeIfAbsent(roomId, id -> {
            Room room = new Room();
            room.setId(roomId);
            room.setName("Room " + roomId);
            return room;
        });
    }

    public void addUserToRoom(int roomId, User user) {
        Room room = getRoom(roomId);
        room.getUsers().add(user);
    }

    public void removeUserFromRoom(int roomId, User user) {
        Room room = getRoom(roomId);
        room.getUsers().remove(user);
    }

    public List<User> getRoomUsers(int roomId) {
        return getRoom(roomId).getUsers();
    }
}
