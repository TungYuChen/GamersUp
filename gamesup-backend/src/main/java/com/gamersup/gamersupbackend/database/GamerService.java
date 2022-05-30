package com.gamersup.gamersupbackend.database;

import com.gamersup.gamersupbackend.model.Gamer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class GamerService implements GamerServiceInterface {

    private GamerRepository gamerRepository;

    public GamerService(GamerRepository gamerRepository) {
        this.gamerRepository = gamerRepository;
    }

    @Override
    public Gamer saveGamer(Gamer gamer) {
        return gamerRepository.save(gamer);
    }
}
