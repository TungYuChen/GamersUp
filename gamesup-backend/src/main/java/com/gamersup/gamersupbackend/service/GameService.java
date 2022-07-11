package com.gamersup.gamersupbackend.service;

import com.gamersup.gamersupbackend.model.Played;
import com.gamersup.gamersupbackend.model.WantToPlay;
import com.gamersup.gamersupbackend.repo.PlayedRepository;
import com.gamersup.gamersupbackend.repo.WantToPlayRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GameService {
    private final WantToPlayRepository wantToPlayRepository;
    private final PlayedRepository playedRepository;

    // Get a list of the games that a gamer wants to play in descending order
    public List<WantToPlay> getWantToPlayGamesByGamerID(long gamerID) {
        List<WantToPlay> wantToPlayList = wantToPlayRepository.findAllByGamerIDAndChecked(gamerID, 1);
        Collections.reverse(wantToPlayList);
        return wantToPlayList;
    }

    // Get a list of gamers who want to play a game in descending order
    public List<WantToPlay> getWantToPlayGamersByGameID(long gameID) {
        List<WantToPlay> wantToPlayList = wantToPlayRepository.findAllByGameIDAndChecked(gameID, 1);
        Collections.reverse(wantToPlayList);
        return wantToPlayList;
    }

    // Get a list of the games that a gamer played in descending order
    public List<Played> getPlayedListByGamerID(long gamerID) {
        List<Played> playedList = playedRepository.findAllByGamerIDAndChecked(gamerID, 1);
        Collections.reverse(playedList);
        return playedList;
    }

    // Get a list of gamers who played a game in descending order
    public List<Played> getPlayedListByGameID(long gameID) {
        List<Played> playedList = playedRepository.findAllByGameIDAndChecked(gameID, 1);
        Collections.reverse(playedList);
        return playedList;
    }

    // Update want to play
    public WantToPlay updateWantToPlay(long gameID, long gamerID) {
        Optional<WantToPlay> wantToPlay = wantToPlayRepository.findByGameIDAndGamerID(gameID, gamerID);
        if (wantToPlay.isPresent()) {
            WantToPlay originalWantToPlay = wantToPlay.get();
            if (originalWantToPlay.getChecked() == 1) {
                originalWantToPlay.setChecked(0);
            } else {
                originalWantToPlay.setChecked(1);
            }
            return wantToPlayRepository.save(originalWantToPlay);
        } else {
            WantToPlay newWantToPlay = new WantToPlay();
            newWantToPlay.setGameID(gameID);
            newWantToPlay.setGamerID(gamerID);
            newWantToPlay.setChecked(1);
           return wantToPlayRepository.save(newWantToPlay);
        }
    }

    // Update played
    public Played updatePlayed(long gameID, long gamerID) {
        Optional<Played> played = playedRepository.findByGameIDAndGamerID(gameID, gamerID);
        if (played.isPresent()) {
            Played originalPlayed = played.get();
            if (originalPlayed.getChecked() == 1) {
                originalPlayed.setChecked(0);
            } else {
                originalPlayed.setChecked(1);
            }
            return playedRepository.save(originalPlayed);
        } else {
            Played newPlayed = new Played();
            newPlayed.setGameID(gameID);
            newPlayed.setGamerID(gamerID);
            newPlayed.setChecked(1);
            return playedRepository.save(newPlayed);
        }
    }

    // Check whether gamer wants to play a game
    public boolean checkWantToPlay(long gameID, long gamerID) {
        Optional<WantToPlay> wantToPlay = wantToPlayRepository.findByGameIDAndGamerID(gameID, gamerID);
        if (wantToPlay.isPresent() && wantToPlay.get().getChecked() == 1) {
            return true;
        }
        return false;
    }

    // Check whether gamer played a game
    public boolean checkPlayed(long gameID, long gamerID) {
        Optional<Played> played = playedRepository.findByGameIDAndGamerID(gameID, gamerID);
        if (played.isPresent() && played.get().getChecked() == 1) {
            return true;
        }
        return false;
    }


}