package com.gamersup.gamersupbackend.database.registration;

import com.gamersup.gamersupbackend.database.GamerService;
import com.gamersup.gamersupbackend.database.registration.token.ConfirmationToken;
import com.gamersup.gamersupbackend.database.registration.token.ConfirmationTokenService;
import com.gamersup.gamersupbackend.model.Gamer;
import com.gamersup.gamersupbackend.model.RegistrationRequest;
import com.gamersup.gamersupbackend.security.ApplicationUserRole;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final GamerService gamerService;
    private final EmailValidator emailValidator;
    private final ConfirmationTokenService confirmationTokenService;

    public String register(RegistrationRequest request) {
        boolean isValid = emailValidator.test(request.getEmail());
        if (!isValid) {
            throw new IllegalStateException("Email not valid");
        }
        return gamerService.signUpUser(new Gamer(request.getUserName(), request.getEmail(), request.getPassword(), ApplicationUserRole.USER));
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                    new IllegalStateException("token not found"));
        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("Email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiredAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        gamerService.enableGamer(confirmationToken.getGamer().getEmail());

        return "confirmed";


    }
}
