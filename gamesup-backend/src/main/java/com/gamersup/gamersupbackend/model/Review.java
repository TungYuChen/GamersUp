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
    private int rating; //rating: 0-5

    @Column(name="comment")
    private String comment;

}
