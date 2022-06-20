package com.gamersup.gamersupbackend.service.email_service.token;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {

    private final ConfirmationTokenRepository repo;

    public void saveConfirmationToken(ConfirmationToken token) {
        repo.save(token);
    }

    public Optional<ConfirmationToken> getToken(String token) {
        return repo.findByToken(token);
    }

    public int setConfirmedAt(String token) {
        return repo.updateConfirmedAt(token, LocalDateTime.now());
    }

    public void deleteTokenByGamerId(long id) {
        if (repo.findById(id).isPresent()) {
            repo.deleteById(id);
        } else {
            throw new IllegalStateException("No such gamer's id");
        }

    }



}
