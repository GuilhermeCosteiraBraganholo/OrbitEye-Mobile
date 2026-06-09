package br.com.fiap.orbiteye.controller;

import br.com.fiap.orbiteye.entity.Regiao;
import br.com.fiap.orbiteye.repository.RegiaoRepository;
import br.com.fiap.orbiteye.service.RegiaoService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.hateoas.EntityModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

/*
 * Controller responsável pelos endpoints da tabela TB_REGIAO.
 * Possui CRUD, Cache e HATEOAS.
 */
@RestController
@RequestMapping("/regioes")
public class RegiaoController {

    private final RegiaoRepository repository;
    private final RegiaoService service;

    /*
     * Injeta o Repository e o Service.
     * Repository é usado para operações simples.
     * Service é usado para a listagem com cache.
     */
    public RegiaoController(
            RegiaoRepository repository,
            RegiaoService service
    ) {
        this.repository = repository;
        this.service = service;
    }

    /*
     * Lista todas as regiões cadastradas.
     * O cache fica no RegiaoService.
     */
    @GetMapping
    public List<Regiao> listar() {
        return service.listarTodas();
    }

    /*
     * Busca uma região por ID e retorna com links HATEOAS.
     */
    @GetMapping("/{id}")
    public EntityModel<Regiao> buscar(@PathVariable Long id) {
        Regiao regiao = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Região não encontrada"));

        return EntityModel.of(
                regiao,
                linkTo(methodOn(RegiaoController.class).buscar(id)).withSelfRel(),
                linkTo(methodOn(RegiaoController.class).listar()).withRel("todas-regioes")
        );
    }

    /*
     * Cadastra uma nova região.
     * Limpa o cache para garantir que a próxima listagem traga dados atualizados.
     */
    @CacheEvict(value = "regioes", allEntries = true)
    @PostMapping
    public Regiao salvar(@RequestBody Regiao regiao) {
        return repository.save(regiao);
    }

    /*
     * Atualiza uma região existente.
     */
    @CacheEvict(value = "regioes", allEntries = true)
    @PutMapping("/{id}")
    public Regiao atualizar(@PathVariable Long id, @RequestBody Regiao regiao) {
        regiao.setIdRegiao(id);
        return repository.save(regiao);
    }

    /*
     * Exclui uma região por ID.
     * Limpa o cache após exclusão.
     */
    @CacheEvict(value = "regioes", allEntries = true)
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repository.deleteById(id);
    }
}