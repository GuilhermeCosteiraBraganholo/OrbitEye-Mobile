package br.com.fiap.orbiteye.client;

import br.com.fiap.orbiteye.dto.ClimaResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

/*
 * Cliente Feign responsável por consumir um serviço externo de clima.
 *
 * Para não depender de chave externa, usamos o próprio endpoint local
 * /mock/clima como se fosse uma API climática externa.
 *
 * Isso demonstra o uso de Feign Client e mantém o projeto funcionando
 * durante a apresentação.
 */
@FeignClient(name = "climaClient", url = "http://localhost:8080")
public interface ClimaClient {

    @GetMapping("/mock/clima")
    ClimaResponse buscarClimaAtual();
}