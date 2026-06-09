package br.com.fiap.orbiteye.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

/*
 * Representa a tabela TB_EVENTO_CLIMATICO.
 * Guarda eventos como chuva forte, enchente e deslizamento.
 */
@Entity
@Table(name = "TB_EVENTO_CLIMATICO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventoClimatico {

    // Chave primária do evento climático
    @Id
    @Column(name = "ID_EVENTO")
    private Long idEvento;

    // Tipo do evento climático
    @Column(name = "TP_EVENTO")
    private String tpEvento;

    // Data do evento
    @Column(name = "DT_EVENTO")
    private LocalDate dtEvento;

    // Nível de risco: BAIXO, MEDIO, ALTO ou CRITICO
    @Column(name = "NIVEL_RISCO")
    private String nivelRisco;

    /*
     * Relacionamento com TB_REGIAO.
     * Muitos eventos climáticos podem acontecer em uma região.
     */
    @ManyToOne
    @JoinColumn(name = "ID_REGIAO")
    private Regiao regiao;
}