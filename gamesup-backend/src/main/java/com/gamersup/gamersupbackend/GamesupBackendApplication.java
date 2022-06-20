package com.gamersup.gamersupbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
//@ComponentScan(basePackages  = {"com.gamersup.gamersupbackend.database"})
public class GamesupBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(GamesupBackendApplication.class, args);
    }



}
