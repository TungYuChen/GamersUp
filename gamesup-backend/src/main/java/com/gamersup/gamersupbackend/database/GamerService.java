package com.gamersup.gamersupbackend.database;

import com.gamersup.gamersupbackend.database.registration.token.ConfirmationToken;
import com.gamersup.gamersupbackend.database.registration.token.ConfirmationTokenRepository;
import com.gamersup.gamersupbackend.database.registration.token.ConfirmationTokenService;
import com.gamersup.gamersupbackend.exception.ResourceNotFoundException;
import com.gamersup.gamersupbackend.model.Gamer;
import com.gamersup.gamersupbackend.security.PasswordConfiguration;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@Service
@AllArgsConstructor
public class GamerService implements UserDetailsService {

    private final GamerRepository gamerRepository;
    private final PasswordConfiguration encoder;
    private final ConfirmationTokenService confirmationTokenService;

    public Gamer saveGamer(Gamer gamer) {
        return gamerRepository.save(gamer);
    }

    public List<Gamer> getAllGamers() {
        return gamerRepository.findAll();
    }

    public Gamer getGamerById(long id) {
//        Optional<Gamer> theGamer = Optional.of(gamerRepository.getReferenceById(id));
//        if (theGamer.isPresent()) {
//            return theGamer.get();
//        } else {
//            throw new ResourceNotFoundException("theGamer", "Id", id);
//        }
        // smarter method
        return gamerRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Gamer", "Id", id)
        );
    }

    public Gamer updateGamer(long id, Gamer gamer) {
        Gamer existingGamer = gamerRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Gamer", "Id", id));
        existingGamer.setUserName(gamer.getUsername());
        existingGamer.setEmail(gamer.getEmail());
        existingGamer.setPassword(gamer.getPassword());
        return gamerRepository.save(existingGamer);
    }

    public void deleteGamer(long id) {
        gamerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Gamer", "Id", id));
        gamerRepository.deleteById(id);
    }

    public boolean checkGamerExisting(String email, String password) {
        Gamer gamer = gamerRepository.findGamerByEmail(email).get();
        if (gamer != null) {
            if (gamer.getPassword().equals(password))
                return true;
        }
        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return gamerRepository.findGamerByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Gamer", "email", email));
    }


    public String signUpUser(Gamer gamer) {
        boolean gamerExists = gamerRepository.findGamerByEmail(gamer.getEmail()).isPresent();
        if (gamerExists) {
            // TODO check of attributes are the same
            // TODO if email not confirmed send confirmation email


            throw new IllegalStateException("Email already taken");
        }
        String encodedPassword = encoder.passwordEncoder().encode(gamer.getPassword());
        gamer.setPassword(encodedPassword);

        gamerRepository.save(gamer);

        String token = UUID.randomUUID().toString();
        // TODO: Send confirmation token
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token, LocalDateTime.now(), LocalDateTime.now().plusMinutes(15), gamer
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);


        // TODO: Send Email

        return token;
    }

    public int enableGamer(String email) {
        return gamerRepository.enableGamer(email);
    }

}
