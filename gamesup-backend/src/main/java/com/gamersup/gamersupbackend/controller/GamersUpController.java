package com.gamersup.gamersupbackend.controller;

import com.gamersup.gamersupbackend.database.GamerService;
import com.gamersup.gamersupbackend.model.Gamer;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/gamers")
public class GamersUpController {

    private GamerService service;

    public GamersUpController(GamerService service) {
        super();
        this.service = service;
    }

    // build create employee REST API
    @PostMapping()
    public ResponseEntity<Gamer> saveEmployee(@RequestBody Gamer gamer) {
        return new ResponseEntity<Gamer>(service.saveGamer(gamer), HttpStatus.CREATED);
    }
}
