package com.gamersup.gamersupbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


/**
 * The profile which other users are visible
 *
 */


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GamerProfile {
    private String userName;
    private String email;
    private Boolean enable;

    private String gamesWantToPlay;
    private String gamesPlayed;
    private String friends;

    public List<Integer> getGamesWantToPlay() {
        return getIntegers(gamesWantToPlay);
    }

    public List<Integer> getGamesPlayed() {
        return getIntegers(gamesPlayed);
    }

    public List<Integer> getFriends() {
        return getIntegers(friends);
    }

    private List<Integer> getIntegers(String gamesPlayed) {
        List<String> gameTempList = Arrays.stream(gamesPlayed.split(",")).toList();
        List<Integer> gameList = new ArrayList<>();
        for (String game : gameTempList) {
            gameList.add(Integer.parseInt(game));
        }
        return gameList;
    }
}
