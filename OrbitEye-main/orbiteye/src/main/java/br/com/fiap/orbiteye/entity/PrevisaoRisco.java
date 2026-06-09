package br.com.fiap.orbiteye.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

/*
 * Representa a tabela TB_PREVISAO_RISCO.
 * Armazena previsões de risco para cada região.
 */
@Entity
@Table(name = "TB_PREVISAO_RISCO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrevisaoRisco {

    // Chave primária da previsão
    @Id
    @Column(name = "ID_PREVISAO")
    private Long idPrevisao;

    // Data da previsão
    @Column(name = "DT_PREVISAO")
    private LocalDate dtPrevisao;

    // Nível previsto: BAIXO, MEDIO, ALTO ou CRITICO
    @Column(name = "NIVEL_PREVISTO")
    private String nivelPrevisto;

    // Probabilidade da previsão
    @Column(name = "PROBABILIDADE")
    private Double probabilidade;

    /*
     * Relacionamento com TB_REGIAO.
     * Uma região pode possuir várias previsões.
     */
    @ManyToOne
    @JoinColumn(name = "ID_REGIAO")
    private Regiao regiao;
}