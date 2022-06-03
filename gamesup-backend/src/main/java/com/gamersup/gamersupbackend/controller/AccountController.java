package com.gamersup.gamersupbackend.controller;

import com.gamersup.gamersupbackend.database.GamerService;
import com.gamersup.gamersupbackend.database.registration.RegistrationService;
import com.gamersup.gamersupbackend.model.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registration")
@AllArgsConstructor
public class AccountController {

    private final GamerService service;
    private final RegistrationService registrationService;

    @PostMapping("/")
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }



}
