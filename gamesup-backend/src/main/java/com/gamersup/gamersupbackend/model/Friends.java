package com.gamersup.gamersupbackend.model;
import javax.persistence.*;
import lombok.*;




@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@IdClass(FriendsId.class)
@Table(name = "friends")
public class Friends {
    @Id
    private long gamerAId;
    @Id
    private long gamerBId;

    private int accepted;


}

