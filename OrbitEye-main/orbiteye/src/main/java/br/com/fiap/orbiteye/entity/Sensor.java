package br.com.fiap.orbiteye.entity;

import jakarta.persistence.*;
import lombok.*;

/*
 * Representa a tabela TB_SENSOR.
 * Cada sensor pertence a uma região.
 */
@Entity
@Table(name = "TB_SENSOR")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sensor {

    // Chave primária do sensor
    @Id
    @Column(name = "ID_SENSOR")
    private Long idSensor;

    // Nome do sensor
    @Column(name = "NM_SENSOR", nullable = false)
    private String nmSensor;

    // Tipo do sensor: PLUVIOMETRO, NIVEL_RIO ou UMIDADE
    @Column(name = "TP_SENSOR", nullable = false)
    private String tpSensor;

    /*
     * Relacionamento com TB_REGIAO.
     * Muitos sensores podem pertencer a uma única região.
     */
    @ManyToOne
    @JoinColumn(name = "ID_REGIAO")
    private Regiao regiao;
}