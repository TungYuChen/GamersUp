package com.gamersup.gamersupbackend.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(name="userid")
    private long userID;

    @Column(name="gameid")
    private long gameID;

    @Column(name="rating")
    private int rating; //rating: 1-5 for a normal review, 0 for a hate game, 6 for a love game

    @Column(name="comment")
    private String comment;

}
