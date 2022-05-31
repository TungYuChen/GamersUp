package com.gamersup.gamersupbackend.database.registration;

import com.gamersup.gamersupbackend.database.GamerService;
import com.gamersup.gamersupbackend.model.Gamer;
import com.gamersup.gamersupbackend.model.RegistrationRequest;
import com.gamersup.gamersupbackend.security.ApplicationUserRole;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final GamerService gamerService;
    private final EmailValidator emailValidator;

    public String register(RegistrationRequest request) {
        boolean isValid = emailValidator.test(request.getEmail());
        if (!isValid) {
            throw new IllegalStateException("Email not valid");
        }
        return gamerService.signUpUser(new Gamer(request.getUserName(), request.getEmail(), request.getPassword(), ApplicationUserRole.USER));
    }
}
