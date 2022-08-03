package com.gamersup.gamersupbackend.service;

import com.gamersup.gamersupbackend.model.Rater;
import com.gamersup.gamersupbackend.model.Rating;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;

@Service
@AllArgsConstructor
public class RecommendationService {

    /**
     * This method computes a similarity rating for each rater to see how similar they are to the user.
     *
     * @param
     * @return a list of type Rating with the item property is a rater's ID and the value property is the dot product
     * comparison, sorted by values from highest to lowest and only including positive similarity ratings
     */
    public ArrayList<Rating> getSimilarRaters(Rater user, ArrayList<Rater> allRaters) {
        ArrayList<Rating> raters = new ArrayList<>();
        for (Rater rater: allRaters) {
            long raterID = rater.getUserID();
            if (raterID != user.getUserID()) {
                double dotProductC = dotProduct(user, rater);
                if (dotProductC > 0) {
                    raters.add(new Rating(raterID, dotProductC));
                }
            }
        }
        // sort raters from highest dot product to lowest
        Collections.sort(raters, Collections.reverseOrder());
        return raters;
    }

    /**
     * This method is to get a list of recommendation on games based on similar gamers' preferences.
     * The games recommended must be rated by the most similar raters and have at least minRaters ratings.
     *
     * @param userID
     * @param numSimilarRaters the number of the top similar raters
     * @param minRaters the recommended game must be rated by a minimal number of raters
     * @return a hashmap of games with the gameID as key and the type Rating as values, with which the item is a game ID
     * and the value is the average rating
     */
    public HashMap<Long, Rating> recommendGames(long userID, ArrayList<Rater> allRaters, int numSimilarRaters, int minRaters) {
        HashMap<Long, Rating> recommendations = new HashMap<>();
        Rater user = getRaterByID(userID, allRaters);
        ArrayList<Rating> topRaters = (ArrayList<Rating>) getSimilarRaters(user, allRaters).subList(0, numSimilarRaters);
        // the rated games of the user
        HashMap<Long, Rating> ratings = user.getRatings();
        for (Rating rater: topRaters) {
            Rater gamer = getRaterByID(rater.getItem(), allRaters);
            // get the similar ratings of the top rater
            ArrayList<Rating> similarRatings = getSimilarRatings(gamer, allRaters, numSimilarRaters, minRaters);
            for (Rating rating: similarRatings) {
                // if the game is not rated by the user and is not in the recommendations yet
                if (!ratings.containsKey(rating.getItem()) && !recommendations.containsKey(rating.getItem())) {
                    recommendations.put(rating.getItem(), rating);
                }
            }
        }
        return recommendations;
    }

    /**
     * This method is to get a list of Rating and their weighted average ratings of the top similar raters and including
     * only those games that have at least minRaters ratings from the most similar raters.
     *
     * @param
     * @param numSimilarRaters the number of the top similar raters
     * @param minRaters the game must be rated by a minimal number of raters
     * @return a list of type Rating with the item is a game ID and the value is the average rating, in sorted order from highest to lowest
     */
    public ArrayList<Rating> getSimilarRatings(Rater gamer, ArrayList<Rater> allRaters, int numSimilarRaters, int minRaters) {
        ArrayList<Rating> ratings = new ArrayList<>();
        ArrayList<Rating> topRaters = (ArrayList<Rating>) getSimilarRaters(gamer, allRaters).subList(0, numSimilarRaters);
        ArrayList<Long> games = gamer.getGamesRated();
        for (long gameID: games) {
            double avg = getWeightedAvgByGameID(gameID, minRaters, topRaters);
            if (avg > 0) {
                ratings.add(new Rating(gameID, avg));
            }
        }
        Collections.sort(ratings, Collections.reverseOrder());
        return ratings;
    }

    /**
     * This method translates a rating from the scale 0 to 6 to the scale -3 to 3 and returns the dot product of the
     * ratings of games that they both rated.
     *
     * @param a the user
     * @param b other user to be compared
     * @return the dot product of the ratings of games
     */
    private double dotProduct(Rater a, Rater b) {
        double denominator = 0;
        double numerator = 1;
        ArrayList<Long> aGames = a.getGamesRated();
        ArrayList<Long> bGames = b.getGamesRated();
        for (Long game: aGames) {
            if (bGames.contains(game)) {
                denominator += (a.getRating(game) - 3) * (b.getRating(game) - 3);
                numerator *= Math.sqrt((a.getRating(game) - 3) * (a.getRating(game) - 3)
                        + (b.getRating(game) - 3) * (b.getRating(game) - 3));
            }
        }
        return denominator / numerator;
    }

    /**
     * This method calculates the weighted average rating of a game.
     *
     * @param gameID
     * @param minRaters the minimal number of raters
     * @param topRaters the top similar raters
     * @return the weighted average ranking on a game, 0 if no minRaters raters gave ratings on the game
     */
    private double getWeightedAvgByGameID(long gameID, int minRaters, ArrayList<Rating> topRaters) {
        int raters = 0;
        double totalRating = 0;
        for (Rating rating: topRaters) {
            long raterID = rating.getItem();
            Rater rater = new Rater(raterID);
            if (rater.hasRating(gameID)) {
                raters++;
                // the rating on the game * rater's dot product
                totalRating += rater.getRating(gameID) * rating.getValue();
            }
        }
        if (raters >= minRaters) {
            return totalRating / raters;
        }
        return 0;
    }

    private Rater getRaterByID(long userID, ArrayList<Rater> allRaters) {
        for (Rater rater: allRaters) {
            if (rater.getUserID() == userID) {
                return rater;
            }
        }
        return null;
    }
}
