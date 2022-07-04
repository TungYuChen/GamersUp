package com.gamersup.gamersupbackend.service;

import com.gamersup.gamersupbackend.model.Reply;
import com.gamersup.gamersupbackend.model.Review;
import com.gamersup.gamersupbackend.repo.ReplyRepository;
import com.gamersup.gamersupbackend.repo.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReplyRepository replyRepository;

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    public Reply saveReply(Reply reply) {
        return replyRepository.save(reply);
    }

    // In descending order
    public List<Review> getAllReviewsByUserID(long userID) {
        List<Review> reviews = reviewRepository.findAllByUserID(userID);
        Collections.reverse(reviews);
        return reviews;
    }

    // In descending order
    public List<Review> getAllReviewsByGameID(long gameID) {
        List<Review> reviews = reviewRepository.findAllByGameID(gameID);
        Collections.reverse(reviews);
        return reviews;
    }

    // Delete review with replies if exists
    public void deleteReview(long reviewId) {
        List<Reply> replies = replyRepository.findAllByReviewID(reviewId);
        if (replies != null) {
            replyRepository.deleteAllInBatch(replies);
        }
        reviewRepository.deleteById(reviewId);
    }

    // Delete a reply
    public void deleteReply(long replyId) {
        replyRepository.deleteById(replyId);
    }

    public List<Reply> getAllRepliesByReviewID(Long reviewID) {
        return replyRepository.findAllByReviewID(reviewID);
    }

    public Optional<Review> findReviewById(long reviewid) {
        return reviewRepository.findById(reviewid);
    }
}
