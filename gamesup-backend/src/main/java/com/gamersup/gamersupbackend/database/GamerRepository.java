package com.gamersup.gamersupbackend.database;

import com.gamersup.gamersupbackend.model.Gamer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GamerRepository extends JpaRepository<Gamer, Integer> {
    Gamer findGamerByEmail(String email);
}
