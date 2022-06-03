package com.gamersup.gamersupbackend.database.registration.email;

public interface EmailSender {
    void send(String to, String email);
}
