package com.gamersup.gamersupbackend.repo;

import com.gamersup.gamersupbackend.model.WantToPlay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WantToPlayRepository extends JpaRepository<WantToPlay, Long> {

    Optional<WantToPlay> findByGameIDAndGamerID(long gameID, long gamerID);

    List<WantToPlay> findAllByGameIDAndChecked(long gameID, int checked);

    List<WantToPlay> findAllByGamerIDAndChecked(long gamerID, int checked);
}
