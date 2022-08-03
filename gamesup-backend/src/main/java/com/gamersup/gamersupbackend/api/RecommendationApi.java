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

    // Get a gamer's recommendation friend list
    @GetMapping("/friendlist/user={userid}")
    public List<Rating> getWantToPlayList(@PathVariable long userid) {
        Rater user = new Rater(userid);
        loadRatings(user);
        return recommendationService.getSimilarRaters(user, getAllRaters());
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

    private void loadRatings(Rater rater) {
        HashMap<Long, Rating> ratings = new HashMap<>();
        List<Review> reviews = reviewService.getAllReviewsByUserID(rater.getUserID());
        Collections.reverse(reviews); // in chronological order
        for (Review review: reviews) {
            ratings.put(review.getGameID(), new Rating(review.getGameID(), review.getRating()));
        }
        rater.setRatings(ratings);
    }
}
