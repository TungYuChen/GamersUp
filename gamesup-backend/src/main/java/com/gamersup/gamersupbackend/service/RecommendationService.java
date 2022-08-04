package com.gamersup.gamersupbackend.service;

import com.gamersup.gamersupbackend.model.Rater;
import com.gamersup.gamersupbackend.model.Rating;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

@Service
@AllArgsConstructor
public class RecommendationService {

    /**
     * This method computes a similarity rating for each rater to see how similar they are to the user.
     *
     * @param user
     * @param allRaters all raters from database
     * @return a list of type Rating with the item property is a rater's ID and the value property is the cosine
     * similarity, sorted by values from highest to lowest and only including positive similarity raters.
     */
    public List<Rating> getSimilarRaters(Rater user, List<Rater> allRaters) {
        List<Rating> raters = new ArrayList<>();
        for (Rater rater: allRaters) {
            long raterID = rater.getUserID();
            if (raterID != user.getUserID()) {
                double cosineSimilarity = getCosineSimilarity(user, rater);
                if (cosineSimilarity > 0) {
                    raters.add(new Rating(raterID, cosineSimilarity));
                }
            }
        }
        // sort raters from the highest to lowest similarity
        Collections.sort(raters, Collections.reverseOrder());
        return raters;
    }

    /**
     * This method is to get a list of recommendation on games based on similar gamers' preferences.
     * The games recommended must be rated by the most similar raters and have at least minRaters ratings.
     *
     * @param userID
     * @param allRaters all raters from database
     * @param numSimilarRaters the number of the top similar raters
     * @param minRaters the recommended game must be rated by a minimal number of raters
     * @return a list of type Rating, with which the item is a game ID and the value is the weighted average rating.
     */
    public List<Rating> recommendGames(long userID, List<Rater> allRaters, int numSimilarRaters, int minRaters) {
        HashMap<Long, Rating> recommendations = new HashMap<>();
        Rater user = getRaterByID(userID, allRaters);
        List<Rating> topRaters = getSimilarRaters(user, allRaters);
        if (numSimilarRaters < topRaters.size()) {
            topRaters = topRaters.subList(0, numSimilarRaters);
        }
        // the rated games of the user
        HashMap<Long, Rating> ratings = user.getRatings();
        for (Rating rater: topRaters) {
            Rater gamer = getRaterByID(rater.getItem(), allRaters);
            // get the similar ratings of the top rater
            List<Rating> similarRatings = getSimilarRatings(gamer, allRaters, numSimilarRaters, minRaters);
            for (Rating rating: similarRatings) {
                // if the game is not rated by the user and is not in the recommendations yet
                if (!ratings.containsKey(rating.getItem()) && !recommendations.containsKey(rating.getItem())) {
                    recommendations.put(rating.getItem(), rating);
                }
            }
        }
        List<Rating> result = new ArrayList(recommendations.values());
        Collections.sort(result, Collections.reverseOrder());
        return result;
    }

    /**
     * This method is to get a list of Rating and their weighted average ratings of the top similar raters and including
     * only those games that have at least minRaters ratings from the most similar raters.
     *
     * @param gamer
     * @param allRaters all raters from database
     * @param numSimilarRaters the number of the top similar raters
     * @param minRaters the game must be rated by a minimal number of raters
     * @return a list of type Rating with the item is a game ID and the value is the average rating, in sorted order
     * from highest to lowest.
     */
    public List<Rating> getSimilarRatings(Rater gamer, List<Rater> allRaters, int numSimilarRaters, int minRaters) {
        ArrayList<Rating> ratings = new ArrayList<>();
        List<Rating> topRaters = getSimilarRaters(gamer, allRaters);
        if (numSimilarRaters < topRaters.size()) {
            topRaters = topRaters.subList(0, numSimilarRaters);
        }
        ArrayList<Long> games = gamer.getGamesRated();
        for (long gameID: games) {
            double avg = getWeightedAvgByGameID(gameID, allRaters, minRaters, topRaters);
            // add the game to ratings if avg is greater than 4
            if (avg > 4) {
                ratings.add(new Rating(gameID, avg));
            }
        }
        Collections.sort(ratings, Collections.reverseOrder());
        return ratings;
    }

    /**
     * This method translates a rating from the scale 0 to 6 to the scale -3 to 3 and returns the cosine similarity of the
     * ratings of games that they both rated.
     *
     * @param a the user
     * @param b other user to be compared
     * @return the cosine similarity of the ratings of games
     */
    private double getCosineSimilarity(Rater a, Rater b) {
        double dotProduct = 0;
        double aLength = 0;
        double bLength = 0;
        int numRatings = 0;
        ArrayList<Long> aGames = a.getGamesRated();
        ArrayList<Long> bGames = b.getGamesRated();
        for (Long game: aGames) {
            if (bGames.contains(game)) {
                dotProduct += (a.getRating(game) - 3) * (b.getRating(game) - 3);
                aLength += (a.getRating(game) - 3) * (a.getRating(game) - 3);
                bLength += (b.getRating(game) - 3) * (b.getRating(game) - 3);
                numRatings++;
            }
        }
        // the user have at least 3 common ratings on games
        if (numRatings > 2) {
            double crossProduct = Math.sqrt(aLength) * Math.sqrt(bLength);
            return dotProduct / crossProduct;
        }
        return 0;
    }

    /**
     * This method calculates the weighted average rating of a game.
     *
     * @param gameID
     * @param minRaters the minimal number of raters
     * @param topRaters the top similar raters
     * @return the weighted average ranking on a game, 0 if no minRaters raters gave ratings on the game
     */
    private double getWeightedAvgByGameID(long gameID, List<Rater> allRaters, int minRaters, List<Rating> topRaters) {
        int raters = 0;
        double totalRating = 0;
        for (Rating rating: topRaters) {
            long raterID = rating.getItem();
            Rater rater = getRaterByID(raterID, allRaters);
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

    private Rater getRaterByID(long userID, List<Rater> allRaters) {
        for (Rater rater: allRaters) {
            if (rater.getUserID() == userID) {
                return rater;
            }
        }
        return null;
    }
}
