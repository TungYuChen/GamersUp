package com.gamersup.gamersupbackend.database.registration.email;


import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SmailService implements EmailSender {

    private final JavaMailSender mailSender;

    @Override
    public void send(String to, String email) {

    }
}
