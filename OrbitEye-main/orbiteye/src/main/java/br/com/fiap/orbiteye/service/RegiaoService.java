package br.com.fiap.orbiteye.service;

import br.com.fiap.orbiteye.entity.Regiao;
import br.com.fiap.orbiteye.repository.RegiaoRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

/*
 * Camada de regras de negócio para Região.
 */
@Service
public class RegiaoService {

    private final RegiaoRepository repository;

    public RegiaoService(RegiaoRepository repository) {
        this.repository = repository;
    }

    /*
     * Cacheia o resultado da consulta.
     *
     * Primeira chamada:
     * vai ao Oracle.
     *
     * Próximas chamadas:
     * vem da memória.
     */
    @Cacheable("regioes")
    public List<Regiao> listarTodas() {

        System.out.println("CONSULTANDO ORACLE...");

        return repository.findAll();
    }
}