package br.com.fiap.orbiteye.controller;

import br.com.fiap.orbiteye.entity.EventoClimatico;
import br.com.fiap.orbiteye.repository.EventoClimaticoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * Controller responsável pelos eventos climáticos.
 */
@RestController
@RequestMapping("/eventos")
public class EventoClimaticoController {

    private final EventoClimaticoRepository repository;

    public EventoClimaticoController(EventoClimaticoRepository repository) {
        this.repository = repository;
    }

    // Lista todos os eventos climáticos
    @GetMapping
    public List<EventoClimatico> listar() {
        return repository.findAll();
    }

    // Busca evento climático pelo ID
    @GetMapping("/{id}")
    public EventoClimatico buscar(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    // Cadastra evento climático
    @PostMapping
    public EventoClimatico salvar(@RequestBody EventoClimatico evento) {
        return repository.save(evento);
    }

    // Exclui evento climático
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repository.deleteById(id);
    }
}