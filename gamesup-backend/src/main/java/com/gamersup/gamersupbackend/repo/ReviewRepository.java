package com.gamersup.gamersupbackend.repo;

import com.gamersup.gamersupbackend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByUserID(long userID);

    List<Review> findAllByGameID(long gameID);
}
