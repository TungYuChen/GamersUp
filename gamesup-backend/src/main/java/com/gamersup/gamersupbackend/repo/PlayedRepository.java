package com.gamersup.gamersupbackend.repo;

import com.gamersup.gamersupbackend.model.Played;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlayedRepository extends JpaRepository<Played, Long> {

    Optional<Played> findByGameIDAndGamerID(long gameID, long gamerID);

    List<Played> findAllByGameIDAndChecked(long gameID, int checked);

    List<Played> findAllByGamerIDAndChecked(long gamerID, int checked);
}
