package br.com.fiap.orbiteye.controller;

import br.com.fiap.orbiteye.dto.PerguntaRequest;
import br.com.fiap.orbiteye.dto.RespostaIA;
import br.com.fiap.orbiteye.service.IaService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ia")
public class IaController {

    private final IaService iaService;

    public IaController(IaService iaService) {
        this.iaService = iaService;
    }

    @PostMapping("/perguntar")
    public RespostaIA perguntar(@RequestBody PerguntaRequest request) {
        return new RespostaIA(
                iaService.responder(request.getPergunta())
        );
    }
}