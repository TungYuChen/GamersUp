package com.gamersup.gamersupbackend.database;

import com.gamersup.gamersupbackend.model.Gamer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GamerRepository extends CrudRepository<Gamer, Integer> {
    Gamer findByGamerName(String name);

    Gamer findById(int id);

}
