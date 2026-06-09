package br.com.fiap.orbiteye.dto;

/*
 * DTO devolvido após autenticação.
 */
public class LoginResponse {

    private String token;
    private Long idUsuario;
    private String nome;
    private String email;

    public LoginResponse(String token) {
        this.token = token;
    }

    public LoginResponse(String token, Long idUsuario, String nome, String email) {
        this.token = token;
        this.idUsuario = idUsuario;
        this.nome = nome;
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }
}
