package br.com.fiap.orbiteye.controller;

import br.com.fiap.orbiteye.dto.ClimaResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * Controller que simula uma API externa de clima.
 * Ele será consumido pelo Feign Client.
 */
@RestController
public class MockClimaController {

    @GetMapping("/mock/clima")
    public ClimaResponse clima() {
        return new ClimaResponse(
                "São Paulo",
                34.5,
                145.0,
                91.0
        );
    }
}