package com.gamersup.gamersupbackend.model;

import com.gamersup.gamersupbackend.interfaces.Recommender;
import com.gamersup.gamersupbackend.service.GamerService;
import com.gamersup.gamersupbackend.service.ReviewService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

public class RecommendationRunner implements Recommender {

    private GamerService gamerService;
    private ReviewService reviewService;

    @Override
    public ArrayList<Rating> getSimilarRaters(long userID) {
        ArrayList<Rating> raters = new ArrayList<>();
        Rater user = new Rater(userID);
        ArrayList<Rater> allRaters = getAllRaters();
        for (Rater rater: allRaters) {
            long raterID = rater.getUserID();
            if (raterID != userID) {
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

    @Override
    public HashMap<Long, Rating> recommendGames(long userID, int numSimilarRaters, int minRaters) {
        HashMap<Long, Rating> recommendations = new HashMap<>();
        ArrayList<Rating> topRaters = (ArrayList<Rating>) getSimilarRaters(userID).subList(0, numSimilarRaters);
        Rater user = new Rater(userID);
        // the rated games of the user
        HashMap<Long, Rating> ratings = user.getRatings();
        for (Rating rater: topRaters) {
            // get the similar ratings of the top rater
            ArrayList<Rating> similarRatings = getSimilarRatings(rater.getItem(), numSimilarRaters, minRaters);
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
     * @param gamerID
     * @param numSimilarRaters the number of the top similar raters
     * @param minRaters the game must be rated by a minimal number of raters
     * @return a list of type Rating with the item is a game ID and the value is the average rating, in sorted order from highest to lowest
     */
    public ArrayList<Rating> getSimilarRatings(long gamerID, int numSimilarRaters, int minRaters) {
        ArrayList<Rating> ratings = new ArrayList<>();
        ArrayList<Rating> topRaters = (ArrayList<Rating>) getSimilarRaters(gamerID).subList(0, numSimilarRaters);
        Rater gamer = new Rater(gamerID);
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

    private ArrayList<Rater> getAllRaters() {
        ArrayList<Rater> allRaters = new ArrayList<>();
        List<GamerInfo> gamers = gamerService.getAllGamers();
        for (GamerInfo gamer: gamers) {
            long gamerID = gamer.getId();
            List<Review> reviewList = reviewService.getAllReviewsByUserID(gamerID);
            if (!reviewList.isEmpty()) {
                allRaters.add(new Rater(gamerID));
            }
        }
        return allRaters;
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

}
