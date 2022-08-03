package com.gamersup.gamersupbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "games")
public class RatedGame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(name="gameid")
    private long gameID;

    @Column(name="name")
    private String name;

    @Column(name="image")
    private String image;

    @Column(name="website")
    private String website;

    @Column(name="rating")
    private double rating;

    @Column(name="genres")
    private String genres;

}
