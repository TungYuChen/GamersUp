package com.gamersup.gamersupbackend.repo;

import com.gamersup.gamersupbackend.model.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
    List<Reply> findAllByReviewID(long reviewID);

}
