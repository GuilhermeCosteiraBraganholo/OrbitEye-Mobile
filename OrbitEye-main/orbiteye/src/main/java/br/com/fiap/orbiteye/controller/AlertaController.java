package br.com.fiap.orbiteye.controller;

import br.com.fiap.orbiteye.entity.Alerta;
import br.com.fiap.orbiteye.repository.AlertaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * Controller responsável pelos alertas do OrbitEye.
 */
@RestController
@RequestMapping("/alertas")
public class AlertaController {

    private final AlertaRepository repository;

    public AlertaController(AlertaRepository repository) {
        this.repository = repository;
    }

    // Lista todos os alertas
    @GetMapping
    public List<Alerta> listar() {
        return repository.findAll();
    }

    // Busca alerta pelo ID
    @GetMapping("/{id}")
    public Alerta buscar(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    // Cadastra alerta
    @PostMapping
    public Alerta salvar(@RequestBody Alerta alerta) {
        return repository.save(alerta);
    }

    // Atualiza alerta
    @PutMapping("/{id}")
    public Alerta atualizar(@PathVariable Long id, @RequestBody Alerta alerta) {
        alerta.setIdAlerta(id);
        return repository.save(alerta);
    }

    // Busca alertas pelo status: ATIVO ou RESOLVIDO
    @GetMapping("/status/{status}")
    public List<Alerta> buscarPorStatus(@PathVariable String status) {
        return repository.findByStAlerta(status);
    }

    // Exclui alerta
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repository.deleteById(id);
    }
}