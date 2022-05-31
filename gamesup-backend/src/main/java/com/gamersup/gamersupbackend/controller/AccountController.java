package com.gamersup.gamersupbackend.controller;

import com.gamersup.gamersupbackend.database.GamerService;
import com.gamersup.gamersupbackend.database.registration.RegistrationService;
import com.gamersup.gamersupbackend.model.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@AllArgsConstructor
public class AccountController {

    private GamerService service;
    private RegistrationService registrationService;

    @PostMapping("/registration")
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }



}
