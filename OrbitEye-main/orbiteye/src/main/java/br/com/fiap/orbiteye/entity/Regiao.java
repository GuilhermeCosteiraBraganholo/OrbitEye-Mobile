package br.com.fiap.orbiteye.entity;

import jakarta.persistence.*;
import lombok.*;

/*
 * Representa a tabela TB_REGIAO.
 * Guarda as regiões monitoradas pelo OrbitEye.
 */
@Entity
@Table(name = "TB_REGIAO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Regiao {

    // Chave primária da região
    @Id
    @Column(name = "ID_REGIAO")
    private Long idRegiao;

    // Nome da região monitorada
    @Column(name = "NM_REGIAO", nullable = false)
    private String nmRegiao;

    // Estado da região
    @Column(name = "DS_ESTADO", nullable = false)
    private String dsEstado;

    // População aproximada da região
    @Column(name = "NR_POPULACAO")
    private Long nrPopulacao;
}