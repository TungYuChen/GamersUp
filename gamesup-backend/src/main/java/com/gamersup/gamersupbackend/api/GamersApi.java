package com.gamersup.gamersupbackend.api;

import com.gamersup.gamersupbackend.model.*;
import com.gamersup.gamersupbackend.service.GamerService;
import com.gamersup.gamersupbackend.service.email_service.RegistrationService;
import com.gamersup.gamersupbackend.security.jwt.JwtUsernameAndPasswordAuthenticationFilter;
import com.gamersup.gamersupbackend.security.jwt.model.AuthenticationResponse;
import com.gamersup.gamersupbackend.security.config.PasswordConfiguration;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/gamers")
@AllArgsConstructor
@CrossOrigin(origins="http://localhost:4200")
public class GamersApi {

    private GamerService service;

    // build create gamer REST API
    // for creating admin account
    @PostMapping("/create")
//    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<GamerInfo> saveGamer(@RequestBody GamerInfo gamer) {
        return new ResponseEntity<GamerInfo>(service.saveGamer(gamer), HttpStatus.CREATED);
    }

    // build get all gamer REST API
    @GetMapping("/all")
//    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public List<GamerInfo> getAllGamers() {
        return service.getAllGamers();
    }

    // build get gamer by id REST API
    @GetMapping("/gamer={gamerid}")
    public GamerProfile getGamerProfileById(@PathVariable long gamerid) {
        return service.getGamerProfileById(gamerid);
    }

    // Get gamer by email
    @GetMapping("/email={email}")
    public GamerProfile getGamerProfileByEmail(@PathVariable String email) {
        return service.getGamerProfileByEmail(email);
    }
    
    // TODO: Search Gamers by username (wild-card)
    @GetMapping("/search?{keyword}")
    public ResponseEntity<List<GamerProfile>> searchGamersByKeyword(@PathVariable("keyword") String keyword) {return null;}

    // build delete gamer REST API
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteGamer(@PathVariable("id") long id) {
        // delete gamer from db
        service.deleteGamer(id);
        return new ResponseEntity<>("Gamer deleted successfully!", HttpStatus.OK);
    }

//    @PostMapping("/searchwithmail")
//    public ResponseEntity<GamerProfile> searchGamerByEmail(@RequestBody EmailRequest email) {
//        GamerInfo gamer = service.getGamerByEmail(email.getEmail());
//        String gamesWantToPlay = (gamer.getGamesWantToPlay() == null)? "-1": gamer.getGamesWantToPlay();
//        String gamersPlayed = (gamer.getGamesPlayed() == null)? "-1": gamer.getGamesPlayed();
//        String friends = (gamer.getFriends() == null)? "-1": gamer.getFriends();
//        GamerProfile profile = new GamerProfile(gamer.getUsername(), gamer.getEmail(),
//                gamer.getEnable(), gamesWantToPlay,
//                gamersPlayed, friends);
//        return new ResponseEntity<>(profile, HttpStatus.OK);
//    }




//    @PostMapping("/registration")
//    public String register(@RequestBody RegistrationRequest request) {
//        return registrationService.register(request);
//    }


//    @PostMapping("/login")
//    public ResponseEntity<Gamer> login(@RequestBody GamerLogin request) {
//        if (service.checkGamerExisting(request.getEmail(), request.getPassword())) {
//
//        }
//    }




}
