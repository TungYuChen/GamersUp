package com.gamersup.gamersupbackend.security.jwt.model;

import lombok.AllArgsConstructor;
import lombok.Getter;


@Getter
@AllArgsConstructor
public class AuthenticationResponse {
    private String jwt;
}
