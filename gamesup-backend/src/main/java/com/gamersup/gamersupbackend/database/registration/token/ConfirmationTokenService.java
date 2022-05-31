package com.gamersup.gamersupbackend.database.registration.token;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {

    private final ConfirmationTokenRepository repo;

    public void saveConfirmationToken(ConfirmationToken token) {
        repo.save(token);
    }

}
