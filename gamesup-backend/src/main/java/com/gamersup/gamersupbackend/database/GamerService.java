package com.gamersup.gamersupbackend.database;

import com.gamersup.gamersupbackend.model.Gamer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class GamerService {
    @Autowired
    private GamerRepository gamerRepository;

    public Gamer saveGamer(Gamer gamer) {
        return gamerRepository.save(gamer);
    }

    public Iterable<Gamer> getGamers() {
        return gamerRepository.findAll();
    }

    public Gamer getGamerByName(String name) {
        return gamerRepository.findByGamerName(name);
    }

    public Gamer getGamerById(int id) {
        return gamerRepository.findById(id);
    }
}
