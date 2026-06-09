package br.com.fiap.orbiteye.repository;

import br.com.fiap.orbiteye.entity.Alerta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/*
 * Repository da tabela TB_ALERTA.
 */
public interface AlertaRepository extends JpaRepository<Alerta, Long> {

    // Busca alertas por status: ATIVO ou RESOLVIDO
    List<Alerta> findByStAlerta(String stAlerta);
}