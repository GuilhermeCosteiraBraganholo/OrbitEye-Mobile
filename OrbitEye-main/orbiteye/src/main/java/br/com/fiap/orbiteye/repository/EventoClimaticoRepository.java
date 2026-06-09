package br.com.fiap.orbiteye.repository;

import br.com.fiap.orbiteye.entity.EventoClimatico;
import org.springframework.data.jpa.repository.JpaRepository;

/*
 * Repository da tabela TB_EVENTO_CLIMATICO.
 */
public interface EventoClimaticoRepository extends JpaRepository<EventoClimatico, Long> {
}