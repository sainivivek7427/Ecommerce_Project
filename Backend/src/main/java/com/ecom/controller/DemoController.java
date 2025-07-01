package com.ecom.controller;

import com.ecom.entity.User;
import com.ecom.repository.UserRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.ecom.repository.UserRepository;


@RestController
public class DemoController {

    @Autowired
    UserRepository UserRepository;
    @Value("${NAME:World}")
    String name;

    @GetMapping("/home")
    String home() {
        User user=new User();
        user.setEmail("saini1564@gmail.com");
        //   user.setId(3L);
        user.setUsername("nitin7429");
        System.out.println("User "+user.toString());
        User userres=UserRepository.save(user);
        System.out.println("Save database "+userres);
        return "Home applications " + name + "!";
    }

}
