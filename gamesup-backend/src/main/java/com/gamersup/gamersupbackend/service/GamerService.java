package com.gamersup.gamersupbackend.service;

import com.gamersup.gamersupbackend.model.Friends;
import com.gamersup.gamersupbackend.repo.FriendRepository;
import com.gamersup.gamersupbackend.service.email_service.email.EmailSender;
import com.gamersup.gamersupbackend.service.email_service.email.EmailValidatorService;
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
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;


@Service
@AllArgsConstructor
public class GamerService implements UserDetailsService {

    private final GamerRepository gamerRepository;
    private final PasswordConfiguration encoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final FriendRepository friendRepository;
    private final EmailValidatorService emailValidator;
    private final EmailSender emailSender;


    public GamerInfo saveGamer(GamerInfo gamer) {
        // Default likes and level
        gamer.setLikes(0);
        gamer.setLevel(0);
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
        Optional<GamerInfo> gamer = gamerRepository.findByEmail(email);
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
        GamerInfo gamer = gamerRepository.findByEmail(email).get();
        if (gamer != null) {
            if (gamer.getPassword().equals(password))
                return true;
        }
        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return gamerRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Gamer", "email", email));
    }


    public String signUpUser(GamerInfo gamer) {
        boolean gamerExists = gamerRepository.findByEmail(gamer.getEmail()).isPresent();
        if (gamerExists) {
            // TODO check of attributes are the same
            // TODO if email not confirmed send confirmation email


            throw new IllegalStateException("Email already taken");
        }
        String encodedPassword = encoder.passwordEncoder().encode(gamer.getPassword());
        gamer.setPassword(encodedPassword);
        gamer.setLikes(0);

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
        return gamerRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("email", "gamer", email));
    }

    public Boolean createFriendRequest(long idA, long idB) {
        if (friendRepository.checkFriendRecord(idA, idB) == null) {
            Friends friendsRecord = new Friends(idA, idB, 0);
            try {
                friendRepository.save(friendsRecord);
                sendAcceptFriendshipMail(gamerRepository.findById(idA).get().getUsername(),
                        gamerRepository.findById(idB).orElseThrow(() -> new ResourceNotFoundException("Id", "gamer", idB)).getUsername(),
                        gamerRepository.findById(idB).orElseThrow(() -> new ResourceNotFoundException("Id", "gamer", idB)).getEmail(),
                        idA, idB
                );
                return true;
            } catch (Exception ex) {
                return false;
            }
        } else {
            return false;
        }
    }

    private boolean sendAcceptFriendshipMail(String nameA, String nameB, String email, long idA, long idB) {
        if (!emailValidator.test(email)) {
            return false;
        }
        System.out.println("Friend request send to " + email);

        emailSender.send(email,
                buildAcceptFriendshipEmail(nameA, nameB, idA, idB));

        return true;
    }

    public List<Long> getFriendListById(Long id) {
        List<Long> tempListA = friendRepository.findGamerAByGamerBAndAccepted(id).orElseThrow(() -> new ResourceNotFoundException("Id", "Gamer", id));
        List<Long> tempListB = friendRepository.findGamerBByGamerAAndAccepted(id).orElseThrow(() -> new ResourceNotFoundException("Id", "Gamer", id));
        return Stream.concat(tempListA.stream(), tempListB.stream()).toList();
    }

    public boolean changeBirthdayById(long id, Date birthday) {
        try {
            GamerInfo gamer = gamerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id", "Gamer", id));
            gamer.setDob(birthday);
            gamerRepository.save(gamer);
            return true;
        } catch (Exception ex) {
            return false;
        }

    }

    public boolean changeLevel(long id, int level) {
        try {
            GamerInfo gamer = gamerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id", "Gamer", id));
            gamer.setLevel(level);
            gamerRepository.save(gamer);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public boolean changeLikes(long id) {
        try {
            GamerInfo gamer = gamerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id", "Gamer", id));
            gamer.setLikes(gamer.getLikes() + 1);
            System.out.println(gamer.getLikes());
            gamerRepository.save(gamer);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    public Integer getLikesById(long id) {
        return gamerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id", "Gamer", id)).getLikes();
    }

    private String buildAcceptFriendshipEmail(String nameA, String nameB, long idA, long idB){
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Reset Password Successfully!!</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + nameB + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> The gamer " + nameA + " invited you as a friend." + " </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\">" +
                "        \n" + "<a href=\"" + "http://localhost:4200/api/gamers/friendsAdd/" + idA + "&" + idB + "\">Accept</a>" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n"  +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
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
