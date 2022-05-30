package com.gamersup.gamersupbackend.controller;

import com.gamersup.gamersupbackend.database.GamerRepository;
import com.gamersup.gamersupbackend.database.GamerService;
import com.gamersup.gamersupbackend.model.Gamer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/gamers")
public class GamersUpController {

    private GamerService service;

    public GamersUpController(GamerService service) {
        super();
        this.service = service;
    }



    // build create gamer REST API
    @PostMapping()
    public ResponseEntity<Gamer> saveGamer(@RequestBody Gamer gamer) {
        return new ResponseEntity<Gamer>(service.saveGamer(gamer), HttpStatus.CREATED);
    }

    // build get all gamer REST API
    @GetMapping("/all")
    public List<Gamer> getAllGamers() {
        return service.getAllGamers();
    }

    // build get gamer by id REST API
    // http://localhost:8080/api/employee/1
    @GetMapping("{id}")
    public ResponseEntity<Gamer> getGamerById(@PathVariable("id") int id) {
        return new ResponseEntity<>(service.getGamerById(id), HttpStatus.OK);
    }

    // build update gamer REST API
    @PutMapping("{id}")
    public ResponseEntity<Gamer> updateGamer(@PathVariable("id") int id, @RequestBody Gamer gamer) {
        return new ResponseEntity<>(service.updateGamer(id, gamer), HttpStatus.OK);
    }

    // build delete gamer REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteGamer(@PathVariable("id") int id) {
        // delete gamer from db
        service.deleteGamer(id);
        return new ResponseEntity<>("Gamer deleted successfully!", HttpStatus.OK);
    }
}
