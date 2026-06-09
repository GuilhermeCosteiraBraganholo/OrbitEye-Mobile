package br.com.fiap.orbiteye.repository;

import br.com.fiap.orbiteye.entity.PrevisaoRisco;
import org.springframework.data.jpa.repository.JpaRepository;

/*
 * Repository da tabela TB_PREVISAO_RISCO.
 */
public interface PrevisaoRiscoRepository extends JpaRepository<PrevisaoRisco, Long> {
}