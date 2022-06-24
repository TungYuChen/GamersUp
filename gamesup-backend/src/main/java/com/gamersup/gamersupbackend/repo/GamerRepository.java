package com.gamersup.gamersupbackend.repo;

import com.gamersup.gamersupbackend.model.GamerInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface GamerRepository extends JpaRepository<GamerInfo, Long> {
    Optional<GamerInfo> findGamerByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE GamerInfo a " + "SET a.enable = TRUE WHERE a.email = ?1")
    int enableGamer(String email);



}
