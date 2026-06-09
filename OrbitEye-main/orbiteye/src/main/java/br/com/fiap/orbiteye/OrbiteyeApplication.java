package br.com.fiap.orbiteye;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.openfeign.EnableFeignClients;

/*
 * Classe principal da API OrbitEye.
 *
 * @EnableCaching ativa o cache.
 * @EnableFeignClients ativa clientes HTTP com Feign.
 */
@EnableCaching
@EnableFeignClients
@SpringBootApplication
public class OrbiteyeApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrbiteyeApplication.class, args);
    }
}