package com.gamersup.gamersupbackend.database;

import com.gamersup.gamersupbackend.model.Gamer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = GamerRepository.class)
class GamerRepositoryTest {
    @Autowired
    private GamerService service;

    @Test
    public void saveGamer() {
        Gamer gamer = new Gamer("James", "abc@gmail.com", "123456");
        service.saveGamer(gamer);
    }


}