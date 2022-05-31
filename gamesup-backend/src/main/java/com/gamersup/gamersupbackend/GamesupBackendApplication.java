package com.gamersup.gamersupbackend;

//import com.gamersup.gamersupbackend.database.GamerRepository;
import com.gamersup.gamersupbackend.model.Gamer;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages  = {"com.gamersup.gamersupbackend.database"})
public class GamesupBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(GamesupBackendApplication.class, args);
    }



}
