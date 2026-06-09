package br.com.fiap.orbiteye.entity;

import jakarta.persistence.*;
import lombok.*;

/*
 * Representa a tabela TB_USUARIO criada no Oracle.
 * Essa entidade será usada pela API Java para acessar os usuários já armazenados no banco.
 */
@Entity
@Table(name = "TB_USUARIO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    // Chave primária da tabela TB_USUARIO
    @Id
    @Column(name = "ID_USUARIO")
    private Long idUsuario;

    // Nome do usuário
    @Column(name = "NM_USUARIO", nullable = false)
    private String nmUsuario;

    // Email do usuário
    @Column(name = "DS_EMAIL", nullable = false, unique = true)
    private String dsEmail;

    // Senha do usuário
    @Column(name = "DS_SENHA", nullable = false)
    private String dsSenha;

    // Tipo do usuário: ADMIN, OPERADOR ou ANALISTA
    @Column(name = "TP_USUARIO", nullable = false)
    private String tpUsuario;
}