package com.gamersup.gamersupbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * The profile which other users are visible
 *
 */


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GamerProfile {
    private String userName;
    private String email;
    private Boolean enable;
}
