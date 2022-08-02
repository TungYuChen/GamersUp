package com.gamersup.gamersupbackend.interfaces;

import com.gamersup.gamersupbackend.model.Rating;

import java.util.ArrayList;
import java.util.HashMap;

public interface Recommender {

    /**
     * This method computes a similarity rating for each rater to see how similar they are to the user.
     *
     * @param userID
     * @return a list of type Rating with the item property is a rater's ID and the value property is the dot product
     * comparison, sorted by values from highest to lowest and only including positive similarity ratings
     */
    public ArrayList<Rating> getSimilarRaters(long userID);

    /**
     * This method is to get a list of recommendation on games based on similar gamers' preferences.
     * The games recommended must be rated by the most similar raters and have at least minRaters ratings.
     *
     * @param userID
     * @param numSimilarRaters the number of the top similar raters
     * @param minRaters the recommended game must be rated by a minimal number of raters
     * @return a hashmap of games with the gameID as key and the type Rating as values, with which the item is a game ID
     * and the value is the average rating, in sorted order from highest to lowest
     */
    public HashMap<Long, Rating> recommendGames(long userID, int numSimilarRaters, int minRaters);
}
