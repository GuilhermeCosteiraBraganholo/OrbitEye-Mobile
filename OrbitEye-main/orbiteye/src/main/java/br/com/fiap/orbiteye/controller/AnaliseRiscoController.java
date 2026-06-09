package br.com.fiap.orbiteye.controller;

import br.com.fiap.orbiteye.dto.AnaliseRiscoResponse;
import br.com.fiap.orbiteye.service.AnaliseRiscoService;
import org.springframework.web.bind.annotation.*;

/*
 * Controller de funcionalidade real do OrbitEye.
 *
 * Esse endpoint não é CRUD.
 * Ele consulta uma região, busca dados climáticos via Feign
 * e calcula risco climático.
 */
@RestController
@RequestMapping("/analise-risco")
public class AnaliseRiscoController {

    private final AnaliseRiscoService service;

    public AnaliseRiscoController(AnaliseRiscoService service) {
        this.service = service;
    }

    @GetMapping("/{idRegiao}")
    public AnaliseRiscoResponse analisar(@PathVariable Long idRegiao) {
        return service.analisar(idRegiao);
    }
}