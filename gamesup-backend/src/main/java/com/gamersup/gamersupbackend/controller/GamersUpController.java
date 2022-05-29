package com.gamersup.gamersupbackend.controller;

import com.gamersup.gamersupbackend.database.GamerService;
import com.gamersup.gamersupbackend.model.Gamer;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class GamersUpController {
    @Autowired
    private GamerService service;

    @PostMapping("/addGamer")
    public Gamer addGamer(@RequestBody Gamer gamer) {
        return service.saveGamer(gamer);
    }


}
