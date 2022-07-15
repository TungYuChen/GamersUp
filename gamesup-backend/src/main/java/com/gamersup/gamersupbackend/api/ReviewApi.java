package com.gamersup.gamersupbackend.api;

import com.gamersup.gamersupbackend.model.Reply;
import com.gamersup.gamersupbackend.model.Review;
import com.gamersup.gamersupbackend.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/reviews")
@AllArgsConstructor
@CrossOrigin(origins="http://localhost:4200")
public class ReviewApi {
    private ReviewService reviewService;

    // Create a new review
    @PostMapping("/user={userid}")
    public ResponseEntity<Review> addReview(@PathVariable long userid, @RequestBody Review review) {
        review.setUserID(userid);
        Review newReview = reviewService.saveReview(review);

        //location: get the original location and append /{id}
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(newReview.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    // Create a new reply
    @PostMapping("/review={reviewid}")
    public ResponseEntity<Reply> addReply(@PathVariable long reviewid, @RequestBody Reply reply) {
        reply.setReviewID(reviewid);
        Reply newReply = reviewService.saveReply(reply);
        return new ResponseEntity<>(newReply, HttpStatus.OK);
    }

    // Read reviews with gameID
    @GetMapping("/game={gameid}/all")
    public List<Review> getAllReviewByGame(@PathVariable long gameid) {
        return reviewService.getAllReviewsByGameID(gameid);
    }

    // Read reviews with userID
    @GetMapping("/user={userid}/all")
    public List<Review> getAllReviewByUser(@PathVariable long userid) {
        return reviewService.getAllReviewsByUserID(userid);
    }

    // Read replies with review id
    @GetMapping("/review={reviewid}/replies")
    public List<Reply> getAllReplies(@PathVariable long reviewid) {
        return reviewService.getAllRepliesByReviewID(reviewid);
    }

    // Update/Edit a review
    @PutMapping("/review={reviewid}")
    public ResponseEntity<Review> editReview(@PathVariable long reviewid, @RequestBody Review review) {
        Review originalReview = reviewService.findReviewById(reviewid).get();
        originalReview.setRating(review.getRating());
        originalReview.setComment(review.getComment());
        Review reviewUpdated = reviewService.saveReview(originalReview);
        return new ResponseEntity<>(reviewUpdated, HttpStatus.OK);
    }

    // Delete a review
    @DeleteMapping("/review={reviewid}")
    public ResponseEntity<Void> deleteReview(@PathVariable long reviewid) {
        reviewService.deleteReview(reviewid);
        return ResponseEntity.noContent().build();
    }

    // Delete a reply
    @DeleteMapping("/reply={replyid}")
    public ResponseEntity<Void> deleteReply(@PathVariable long replyid) {
        reviewService.deleteReply(replyid);
        return ResponseEntity.noContent().build();
    }

}
