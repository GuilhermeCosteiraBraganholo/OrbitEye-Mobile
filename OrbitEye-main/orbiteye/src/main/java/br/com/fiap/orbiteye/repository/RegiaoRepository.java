package br.com.fiap.orbiteye.repository;

import br.com.fiap.orbiteye.entity.Regiao;
import org.springframework.data.jpa.repository.JpaRepository;

/*
 * Repository da tabela TB_REGIAO.
 */
public interface RegiaoRepository extends JpaRepository<Regiao, Long> {
}