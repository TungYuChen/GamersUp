package com.gamersup.gamesupbackend.controller;

import com.gamersup.gamesupbackend.database.GamerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path="/")
public class GamersUpController {
    @Autowired
    private GamerRepository gamerRepository;


}
