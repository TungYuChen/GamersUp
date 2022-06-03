package com.gamersup.gamersupbackend.database.registration.token;

import com.gamersup.gamersupbackend.model.Gamer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class ConfirmationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private LocalDateTime creatAt;

    private LocalDateTime confirmedAt;

    @Column(nullable = false)
    private LocalDateTime expiredAt;


    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "gamer_id"
    )
    private Gamer gamer;

    public ConfirmationToken(String token, LocalDateTime creatAt, LocalDateTime expiredAt, Gamer gamer) {
        this.token = token;
        this.creatAt = creatAt;
        this.expiredAt = expiredAt;
        this.gamer = gamer;
    }
}
