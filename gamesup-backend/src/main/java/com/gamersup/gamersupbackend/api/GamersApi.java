package com.gamersup.gamersupbackend.api;

import com.gamersup.gamersupbackend.service.GamerService;
import com.gamersup.gamersupbackend.service.email_service.RegistrationService;
import com.gamersup.gamersupbackend.security.jwt.JwtUsernameAndPasswordAuthenticationFilter;
import com.gamersup.gamersupbackend.security.jwt.model.AuthenticationResponse;
import com.gamersup.gamersupbackend.model.GamerInfo;
import com.gamersup.gamersupbackend.model.GamerLoginRequest;
import com.gamersup.gamersupbackend.model.GamerProfile;
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
    // http://localhost:8080/api/gamers/1
    @GetMapping("/{id}")
    public ResponseEntity<GamerProfile> getGamerById(@PathVariable("id") long id) {
        return new ResponseEntity<>(service.getGamerSkinById(id), HttpStatus.OK);
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
