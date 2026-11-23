package com.beerbrew.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@SpringBootApplication
public class BeerbrewWebApplication {
    public static void main(String[] args) {
        String profiles = System.getenv("SPRING_PROFILES_ACTIVE");
        if (profiles == null || profiles.contains("sqlite")) {
            new File("./data").mkdirs();
        }
        SpringApplication.run(BeerbrewWebApplication.class, args);
    }
}
