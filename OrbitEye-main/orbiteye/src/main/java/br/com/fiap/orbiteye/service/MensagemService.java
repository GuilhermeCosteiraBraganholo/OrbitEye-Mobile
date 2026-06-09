package br.com.fiap.orbiteye.service;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

/*
 * Serviço responsável pelo envio de mensagens.
 */
@Service
public class MensagemService {

    private final RabbitTemplate rabbitTemplate;

    public MensagemService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void enviarAlerta(String mensagem) {

        rabbitTemplate.convertAndSend(
                "fila-alertas",
                mensagem
        );

        System.out.println("Mensagem enviada: " + mensagem);
    }
}