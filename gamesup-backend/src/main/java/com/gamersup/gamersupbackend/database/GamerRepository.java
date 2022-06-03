package com.gamersup.gamersupbackend.database;

import com.gamersup.gamersupbackend.model.Gamer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface GamerRepository extends JpaRepository<Gamer, Long> {
    Optional<Gamer> findGamerByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Gamer a " + "SET a.enable = TRUE WHERE a.email = ?1")
    int enableGamer(String email);
}
