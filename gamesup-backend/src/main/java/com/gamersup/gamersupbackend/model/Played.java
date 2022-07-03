package com.gamersup.gamersupbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

/*
This class is for gamer and played game pair.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "played")
public class Played {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @Column(name="gameid")
    private long gameID;

    @Column(name="gamerid")
    private long gamerID;

    @Column(name="checked")
    private int checked; // 0 - unchecked, 1 - checked

}
