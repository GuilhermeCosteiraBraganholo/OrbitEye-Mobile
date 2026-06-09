package br.com.fiap.orbiteye.service;

import org.springframework.stereotype.Service;

@Service
public class IaService {

    public String responder(String pergunta) {

        String texto = pergunta.toLowerCase();

        if (texto.contains("enchente")) {
            return "Evite áreas alagadas, desligue a energia se houver risco e siga as orientações da defesa civil.";
        }

        if (texto.contains("deslizamento")) {
            return "Afaste-se de encostas, muros e áreas instáveis. Procure um local seguro imediatamente.";
        }

        if (texto.contains("chuva")) {
            return "Acompanhe os alertas do OrbitEye, evite deslocamentos desnecessários e não atravesse áreas alagadas.";
        }

        return "O OrbitEye recomenda acompanhar os alertas da sua região e seguir orientações oficiais de segurança.";
    }
}