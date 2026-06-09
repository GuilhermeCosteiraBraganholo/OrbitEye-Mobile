package br.com.fiap.orbiteye.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

/*
 * Representa a tabela TB_ALERTA.
 * Guarda alertas gerados a partir de eventos climáticos.
 */
@Entity
@Table(name = "TB_ALERTA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alerta {

    // Chave primária do alerta
    @Id
    @Column(name = "ID_ALERTA")
    private Long idAlerta;

    // Descrição do alerta
    @Column(name = "DS_ALERTA")
    private String dsAlerta;

    // Data do alerta
    @Column(name = "DT_ALERTA")
    private LocalDate dtAlerta;

    // Status: ATIVO ou RESOLVIDO
    @Column(name = "ST_ALERTA")
    private String stAlerta;

    /*
     * Relacionamento com TB_EVENTO_CLIMATICO.
     * Um evento climático pode gerar um ou mais alertas.
     */
    @ManyToOne
    @JoinColumn(name = "ID_EVENTO")
    private EventoClimatico eventoClimatico;
}