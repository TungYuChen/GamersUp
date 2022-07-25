package com.gamersup.gamersupbackend.repo;

import com.gamersup.gamersupbackend.model.Friends;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRepository extends JpaRepository<Friends, Long> {


    @Query("SELECT gamerBId FROM Friends WHERE gamerAId = ?1 AND accepted = 1")
    Optional<List<Long>> findGamerBByGamerAAndAccepted(long id);


    @Query("SELECT gamerAId FROM Friends WHERE gamerBId = ?1 AND accepted = 1")
    Optional<List<Long>> findGamerAByGamerBAndAccepted(long id);

    @Query("SELECT accepted FROM Friends WHERE (gamerAId = ?1 OR gamerBId = ?1) AND (gamerAId = ?2 OR gamerBId = ?2)")
    Optional<Integer> checkFriendRecord(long idA, long idB);

    @Query(value = "SELECT * FROM friends WHERE (gamerAId = ?1 OR gamerBId = ?1) AND (gamerAId = ?2 OR gamerBId = ?2)",
    nativeQuery = true)
    Optional<Friends> findFriendsRecordByIds(long idA, long idB);

    @Transactional
    @Modifying
    @Query("UPDATE Friends a " + "SET a.accepted = 1 WHERE a.gamerAId = ?1 AND a.gamerBId = ?2")
    int acceptFriend(long a, long b);
}
