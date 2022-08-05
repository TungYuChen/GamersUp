package com.gamersup.gamersupbackend.api;

import com.gamersup.gamersupbackend.model.*;
import com.gamersup.gamersupbackend.service.GamerService;
import com.gamersup.gamersupbackend.service.RecommendationService;
import com.gamersup.gamersupbackend.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("api/recommendations")
@AllArgsConstructor
@CrossOrigin(origins="http://localhost:4200")
public class RecommendationApi {
    private GamerService gamerService;
    private ReviewService reviewService;
    private RecommendationService recommendationService;

    // Get a list of recommendation gamers for a user
    @GetMapping("/gamerlist/user={userid}")
    public List<Rating> getRecommendGamers(@PathVariable long userid) {
        Rater user = new Rater(userid);
        user.setRatings(getAllRatings(userid));
        return recommendationService.getSimilarRaters(user, getAllRaters());
    }

    // Get a list of recommendation games list for a user
    @GetMapping("/games/user={userid}")
    public List<Rating> getRecommendGames(@PathVariable long userid) {
        return recommendationService.recommendGames(userid, getAllRaters(), 5, 2);
    }

    // Check whether a gamer has ratings
    @GetMapping("/hasratings/user={userid}")
    public boolean checkLoveGame(@PathVariable long userid) {
        return recommendationService.hasRatings(userid, getAllRaters());
    }

    /**
     * This method is to get all the raters from the database using ReviewServie
     *
     * @return a list of type Rater
     */
    private List<Rater> getAllRaters() {
        ArrayList<Rater> allRaters = new ArrayList<>();
        List<GamerInfo> gamers = gamerService.getAllGamers();
        for (GamerInfo gamer: gamers) {
            long gamerID = gamer.getId();
            List<Review> reviewList = reviewService.getAllReviewsByUserID(gamerID);
            if (!reviewList.isEmpty()) {
                Rater rater = new Rater(gamerID);
                rater.setRatings(getAllRatings(gamerID));
                allRaters.add(rater);
            }
        }
        return allRaters;
    }

    /**
     * This method is to get all the ratings of a user from the database using ReviewService.
     * @param userID
     * @return a map of gameID and Rating pair
     */
    private HashMap<Long, Rating> getAllRatings(long userID) {
        HashMap<Long, Rating> ratings = new HashMap<>();
        List<Review> reviews = reviewService.getAllReviewsByUserID(userID);
        Collections.reverse(reviews); // in chronological order
        for (Review review: reviews) {
            // put the newest rating for each game in ratings
            ratings.put(review.getGameID(), new Rating(review.getGameID(), review.getRating()));
        }
        return ratings;
    }
}
