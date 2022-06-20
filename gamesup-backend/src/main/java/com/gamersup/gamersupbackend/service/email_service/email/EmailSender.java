package com.gamersup.gamersupbackend.service.email_service.email;

public interface EmailSender {
    void send(String to, String email);
}
