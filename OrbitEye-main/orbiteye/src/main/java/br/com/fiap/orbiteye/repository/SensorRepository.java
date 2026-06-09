package br.com.fiap.orbiteye.repository;

import br.com.fiap.orbiteye.entity.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;

/*
 * Repository da tabela TB_SENSOR.
 */
public interface SensorRepository extends JpaRepository<Sensor, Long> {
}