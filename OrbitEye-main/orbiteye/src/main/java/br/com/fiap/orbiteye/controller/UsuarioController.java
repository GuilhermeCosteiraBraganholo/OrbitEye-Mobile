package br.com.fiap.orbiteye.controller;

import br.com.fiap.orbiteye.entity.Usuario;
import br.com.fiap.orbiteye.repository.UsuarioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * Controller responsável pelos endpoints da tabela TB_USUARIO.
 */
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioRepository repository;

    public UsuarioController(UsuarioRepository repository) {
        this.repository = repository;
    }

    // Lista todos os usuários cadastrados no Oracle
    @GetMapping
    public List<Usuario> listar() {
        return repository.findAll();
    }

    // Busca um usuário pelo ID
    @GetMapping("/{id}")
    public Usuario buscar(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    // Cadastra um novo usuário
    @PostMapping
    public Usuario salvar(@RequestBody Usuario usuario) {
        return repository.save(usuario);
    }

    // Exclui um usuário pelo ID
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repository.deleteById(id);
    }
}