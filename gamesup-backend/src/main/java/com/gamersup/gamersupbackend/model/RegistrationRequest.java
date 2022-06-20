package com.gamersup.gamersupbackend.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * For register request body
 */


@Getter
@Setter
@EqualsAndHashCode
@ToString
public class RegistrationRequest {
    private String userName;
    private String email;
    private String password;

}
