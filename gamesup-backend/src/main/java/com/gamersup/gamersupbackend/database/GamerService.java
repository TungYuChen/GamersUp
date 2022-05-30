package com.gamersup.gamersupbackend.database;

import com.gamersup.gamersupbackend.exception.ResourceNotFoundException;
import com.gamersup.gamersupbackend.model.Gamer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class GamerService {

    private GamerRepository gamerRepository;

    public GamerService(GamerRepository gamerRepository) {
        super();
        this.gamerRepository = gamerRepository;
    }

    public Gamer saveGamer(Gamer gamer) {
        return gamerRepository.save(gamer);
    }

    public List<Gamer> getAllGamers() {
        return gamerRepository.findAll();
    }

    public Gamer getGamerById(int id) {
//        Optional<Gamer> theGamer = Optional.of(gamerRepository.getReferenceById(id));
//        if (theGamer.isPresent()) {
//            return theGamer.get();
//        } else {
//            throw new ResourceNotFoundException("theGamer", "Id", id);
//        }
        // smarter method
        return gamerRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Gamer", "Id", id)
        );
    }

    public Gamer updateGamer(int id, Gamer gamer) {
        Gamer existingGamer = gamerRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Gamer", "Id", id));
        existingGamer.setName(gamer.getName());
        existingGamer.setEmail(gamer.getEmail());
        existingGamer.setPassword(gamer.getPassword());
        return gamerRepository.save(existingGamer);
    }

    public void deleteGamer(int id) {
        gamerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Gamer", "Id", id));
        gamerRepository.deleteById(id);
    }

    public boolean checkGamerExisting(String email, String password) {
        Gamer gamer = gamerRepository.findGamerByEmail(email);
        if (gamer != null) {
            if (gamer.getPassword().equals(password))
                return true;
        }
        return false;
    }
}
