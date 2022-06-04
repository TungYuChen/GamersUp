package com.gamersup.gamersupbackend.controller;

import com.gamersup.gamersupbackend.database.GamerService;
import com.gamersup.gamersupbackend.database.registration.RegistrationService;
import com.gamersup.gamersupbackend.model.Gamer;
import com.gamersup.gamersupbackend.model.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/gamers")
@AllArgsConstructor
public class GamersUpController {

    private GamerService service;
    private RegistrationService registrationService;

    // build create gamer REST API
    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<Gamer> saveGamer(@RequestBody Gamer gamer) {
        return new ResponseEntity<Gamer>(service.saveGamer(gamer), HttpStatus.CREATED);
    }

    // build get all gamer REST API
    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public List<Gamer> getAllGamers() {
        return service.getAllGamers();
    }

    // build get gamer by id REST API
    // http://localhost:8080/api/gamers/1
    @GetMapping("/{id}")
    public ResponseEntity<Gamer> getGamerById(@PathVariable("id") long id) {
        return new ResponseEntity<>(service.getGamerById(id), HttpStatus.OK);
    }

    // build update gamer REST API
    @PutMapping("/{id}")
    public ResponseEntity<Gamer> updateGamer(@PathVariable("id") long id, @RequestBody Gamer gamer) {
        return new ResponseEntity<>(service.updateGamer(id, gamer), HttpStatus.OK);
    }

    // build delete gamer REST API
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGamer(@PathVariable("id") long id) {
        // delete gamer from db
        service.deleteGamer(id);
        return new ResponseEntity<>("Gamer deleted successfully!", HttpStatus.OK);
    }

    @PostMapping("/registration")
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }



}
