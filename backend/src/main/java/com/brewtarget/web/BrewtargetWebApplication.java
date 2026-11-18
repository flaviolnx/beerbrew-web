package com.brewtarget.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@SpringBootApplication
public class BrewtargetWebApplication {
    public static void main(String[] args) {
        new File("./data").mkdirs();
        SpringApplication.run(BrewtargetWebApplication.class, args);
    }
}