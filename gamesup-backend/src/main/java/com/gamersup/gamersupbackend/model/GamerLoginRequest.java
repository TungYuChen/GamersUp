package com.gamersup.gamersupbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * For login request body
 */

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GamerLoginRequest {
    private String password;
    private String email;
}
