package com.gamersup.gamesupbackend.database;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GamerRepository extends CrudRepository<Gamer, Integer> {
}
