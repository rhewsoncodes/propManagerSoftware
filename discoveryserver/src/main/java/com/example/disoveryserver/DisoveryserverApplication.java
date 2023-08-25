package com.example.disoveryserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class DisoveryserverApplication {

	public static void main(String[] args) {
		SpringApplication.run(DisoveryserverApplication.class, args);
	}

}
