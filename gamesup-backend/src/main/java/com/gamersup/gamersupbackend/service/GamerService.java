package com.gamersup.gamersupbackend.service;

import com.gamersup.gamersupbackend.service.email_service.token.ConfirmationToken;
import com.gamersup.gamersupbackend.service.email_service.token.ConfirmationTokenService;
import com.gamersup.gamersupbackend.model.exception.ResourceNotFoundException;
import com.gamersup.gamersupbackend.model.GamerInfo;
import com.gamersup.gamersupbackend.model.GamerProfile;
import com.gamersup.gamersupbackend.repo.GamerRepository;
import com.gamersup.gamersupbackend.security.config.PasswordConfiguration;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
@AllArgsConstructor
public class GamerService implements UserDetailsService {

    private final GamerRepository gamerRepository;
    private final PasswordConfiguration encoder;
    private final ConfirmationTokenService confirmationTokenService;


    public GamerInfo saveGamer(GamerInfo gamer) {
        return gamerRepository.save(gamer);
    }

    public List<GamerInfo> getAllGamers() {
        return gamerRepository.findAll();
    }

    public GamerInfo getGamerInfoById(long id) {

        // smarter method
        return gamerRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Gamer", "Id", id)
        );

    }

    public GamerProfile getGamerProfileById(long id) {
        Optional<GamerInfo> gamer = gamerRepository.findById(id);
        return getGamerProfile(gamer);
    }

    public GamerProfile getGamerProfileByEmail(String email) {
        Optional<GamerInfo> gamer = gamerRepository.findGamerByEmail(email);
        return getGamerProfile(gamer);
    }

    private GamerProfile getGamerProfile(Optional<GamerInfo> gamer) {
        if (gamer.isPresent()) {
            GamerInfo gamerInfo = gamer.get();
            GamerProfile result = new GamerProfile(gamerInfo.getId(), gamerInfo.getUsername(), gamerInfo.getEmail(),
                    gamerInfo.getDob(), gamerInfo.getAvatarUrl(), gamerInfo.getBio(), gamerInfo.getLevel(), gamerInfo.getLikes());
            return result;
        } else {
            throw new ResourceNotFoundException("Gamer", "gamer", gamer);
        }
    }

    public GamerInfo updateGamer(long id, GamerInfo gamer) {
        GamerInfo existingGamer = gamerRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Gamer", "Id", id));
        existingGamer.setUserName(gamer.getUsername());
        existingGamer.setEmail(gamer.getEmail());
        existingGamer.setPassword(gamer.getPassword());
        return gamerRepository.save(existingGamer);
    }

    public void deleteGamer(long id) {
        gamerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Gamer", "Id", id));
        confirmationTokenService.deleteTokenByGamerId(id);
        gamerRepository.deleteById(id);
    }

    public boolean checkGamerExisting(String email, String password) {
        GamerInfo gamer = gamerRepository.findGamerByEmail(email).get();
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


    public String signUpUser(GamerInfo gamer) {
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



    public void updatePassword(GamerInfo gamer, String newPassword) {
        String encodedPassword = encoder.passwordEncoder().encode(newPassword);
        gamer.setPassword(encodedPassword);

        gamerRepository.save(gamer);

    }

    public GamerInfo getGamerByEmail(String email) {
        return gamerRepository.findGamerByEmail(email).orElseThrow(() -> new ResourceNotFoundException("email", "gamer", email));
    }

    public String getBioById(long id) {
        GamerInfo gamer = gamerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("id", "gamer", id));
        return gamer.getBio();
    }

    public Boolean changeBioById(long id, String bio) {
        GamerInfo gamer = gamerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("id", "gamer", id));
        gamer.setBio(bio);
        if (gamerRepository.save(gamer) != null) {
            return true;
        } else
            return false;
    }

    public Boolean changeAvatarById(long id, String url) {
        GamerInfo gamer = gamerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("id", "gamer", id));
        gamer.setAvatarUrl(url);
        if (gamerRepository.save(gamer) != null) {
            return true;
        } else
            return false;
    }

}
