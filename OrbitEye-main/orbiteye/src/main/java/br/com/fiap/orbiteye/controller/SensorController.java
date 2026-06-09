package br.com.fiap.orbiteye.controller;

import br.com.fiap.orbiteye.entity.Sensor;
import br.com.fiap.orbiteye.repository.SensorRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * Controller responsável pelos sensores climáticos.
 */
@RestController
@RequestMapping("/sensores")
public class SensorController {

    private final SensorRepository repository;

    public SensorController(SensorRepository repository) {
        this.repository = repository;
    }

    // Lista todos os sensores
    @GetMapping
    public List<Sensor> listar() {
        return repository.findAll();
    }

    // Busca sensor pelo ID
    @GetMapping("/{id}")
    public Sensor buscar(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    // Cadastra novo sensor
    @PostMapping
    public Sensor salvar(@RequestBody Sensor sensor) {
        return repository.save(sensor);
    }

    // Exclui sensor
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repository.deleteById(id);
    }
}