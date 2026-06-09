package br.com.fiap.orbiteye.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
 * Configuração de CORS.
 * Permite que aplicações externas, como front-end React Native ou Web,
 * consumam a API do OrbitEye.
 */
@Configuration
public class CorsConfig {

    /*
     * Libera requisições vindas de outros clientes.
     * Em produção, o ideal seria colocar apenas o domínio oficial do app.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*");
            }
        };
    }
}