package br.com.fiap.orbiteye.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/*
 * Configuração da fila RabbitMQ.
 */
@Configuration
public class RabbitConfig {

    @Bean
    public Queue filaAlertas() {
        return new Queue("fila-alertas", false);
    }
}