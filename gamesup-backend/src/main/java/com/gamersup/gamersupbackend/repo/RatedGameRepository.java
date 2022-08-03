package com.gamersup.gamersupbackend.repo;

import com.gamersup.gamersupbackend.model.RatedGame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatedGameRepository extends JpaRepository<RatedGame, Long> {
}
