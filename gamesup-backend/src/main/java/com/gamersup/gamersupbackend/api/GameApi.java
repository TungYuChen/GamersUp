package com.gamersup.gamersupbackend.api;

import com.gamersup.gamersupbackend.model.Played;
import com.gamersup.gamersupbackend.model.WantToPlay;
import com.gamersup.gamersupbackend.service.GameService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/games")
@AllArgsConstructor
@CrossOrigin(origins="http://localhost:4200")
public class GameApi {
    private GameService gameService;

    // Get a gamer's want-to-play list with user id
    @GetMapping("/user={userid}/wanttoplaylist")
    public List<WantToPlay> getWantToPlayList(@PathVariable long userid) {
        return gameService.getWantToPlayGamesByGamerID(userid);
    }

    // Get a game's want-to-play-gamer list with game id
    @GetMapping("/game={gameid}/wanttoplaygamerslist")
    public List<WantToPlay> getWantToPlayGamersList(@PathVariable long gameid) {
        return gameService.getWantToPlayGamersByGameID(gameid);
    }

    // Get a gamer's played list with user id
    @GetMapping("/user={userid}/playedlist")
    public List<Played> getPlayedList(@PathVariable long userid) {
        return gameService.getPlayedListByGamerID(userid);
    }

    // Get a game's played-gamer list with game id
    @GetMapping("/game={gameid}/playedgamerslist")
    public List<Played> getPlayedGamersList(@PathVariable long gameid) {
        return gameService.getPlayedListByGameID(gameid);
    }

    // Create/Update a new want-to-play
    @PutMapping("/wanttoplay")
    public ResponseEntity<WantToPlay> updateWantToPlay(@RequestBody WantToPlay wantToPlay) {
        WantToPlay updatedWantToPlay = gameService.updateWantToPlay
                (wantToPlay.getGameID(), wantToPlay.getGamerID());
        return new ResponseEntity<>(updatedWantToPlay, HttpStatus.OK);

    }

    // Create/Update a new Played
    @PutMapping("/played")
    public ResponseEntity<Played> updateWantToPlay(@RequestBody Played played) {
        Played updatedPlayed = gameService.updatePlayed
                (played.getGameID(), played.getGamerID());
        return new ResponseEntity<>(updatedPlayed, HttpStatus.OK);

    }

}
