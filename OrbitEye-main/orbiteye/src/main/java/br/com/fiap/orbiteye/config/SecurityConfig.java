package br.com.fiap.orbiteye.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/*
 * Configuração temporária de segurança.
 * Nesta fase inicial, liberamos os endpoints para conseguir testar a API,
 * Swagger e CRUDs sem precisar autenticar.
 *
 * Depois vamos trocar isso por JWT para atender o requisito da disciplina.
 */
@Configuration
public class SecurityConfig {

    /*
     * Define as regras de segurança HTTP da aplicação.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http

                // Desativa CSRF porque a API será stateless e testada via Postman/Swagger.
                .csrf(csrf -> csrf.disable())

                // Libera todas as requisições temporariamente.
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )

                // Monta a configuração final.
                .build();
    }
}