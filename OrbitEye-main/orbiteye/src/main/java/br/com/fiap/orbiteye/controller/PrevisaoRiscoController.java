package br.com.fiap.orbiteye.controller;

import br.com.fiap.orbiteye.entity.PrevisaoRisco;
import br.com.fiap.orbiteye.repository.PrevisaoRiscoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * Controller responsável pelas previsões de risco.
 */
@RestController
@RequestMapping("/previsoes")
public class PrevisaoRiscoController {

    private final PrevisaoRiscoRepository repository;

    public PrevisaoRiscoController(PrevisaoRiscoRepository repository) {
        this.repository = repository;
    }

    // Lista todas as previsões de risco
    @GetMapping
    public List<PrevisaoRisco> listar() {
        return repository.findAll();
    }

    // Busca previsão por ID
    @GetMapping("/{id}")
    public PrevisaoRisco buscar(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    // Cadastra previsão de risco
    @PostMapping
    public PrevisaoRisco salvar(@RequestBody PrevisaoRisco previsao) {
        return repository.save(previsao);
    }

    // Exclui previsão
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repository.deleteById(id);
    }
}