package com.gamersup.gamersupbackend.api;

import com.gamersup.gamersupbackend.model.*;
import com.gamersup.gamersupbackend.model.exception.ResourceNotFoundException;
import com.gamersup.gamersupbackend.security.config.PasswordConfiguration;
import com.gamersup.gamersupbackend.security.jwt.JwtUsernameAndPasswordAuthenticationFilter;
import com.gamersup.gamersupbackend.security.jwt.model.AuthenticationResponse;


import com.gamersup.gamersupbackend.service.*;
import com.gamersup.gamersupbackend.service.email_service.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/account")
@AllArgsConstructor
public class AccountApi {

    private final GamerService service;
    private final RegistrationService registrationService;
    private AuthenticationManager authenticationManager;
    private JwtUsernameAndPasswordAuthenticationFilter jwtUsernameAndPasswordAuthenticationFilter;
    private final PasswordConfiguration encoder;
    private final ResetPasswordService resetPasswordService;

    @PostMapping("/registration")
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token) {
        String result =  registrationService.confirmToken(token);
        return "direct:/login";
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody GamerLoginRequest request) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),
                    request.getPassword()));
        } catch (BadCredentialsException ex) {
            throw new Exception("Incorrect email or password", ex);
        }

        final UserDetails userDetails = service.loadUserByUsername(request.getEmail());
        final String jwt = jwtUsernameAndPasswordAuthenticationFilter.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    // build update gamer REST API
    @PutMapping("/edit/{id}")
    public ResponseEntity<GamerInfo> updateGamerPassword(@PathVariable("id") long id, @RequestBody GamerInfo gamer) {
        String encodedPassword = encoder.passwordEncoder().encode(gamer.getPassword());
        gamer.setPassword(encodedPassword);
        return new ResponseEntity<>(service.updateGamer(id, gamer), HttpStatus.OK);
    }

    // reset password
    @PostMapping("/reset_password")
    public String resetPasswordProgress(@RequestBody ResetPasswordRequest request) {
        return resetPasswordService.resetPassword(request);
    }



}
