package br.com.fiap.orbiteye.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

/*
 * Serviço responsável por gerar tokens JWT.
 */
@Service
public class JwtService {

    /*
     * Chave secreta usada para assinar o token.
     * Precisa ser uma string grande para funcionar com HS256.
     */
    private static final String SECRET =
            "ORBITEYE_SUPER_SECRET_KEY_2026_ORBITEYE_SUPER_SECRET_KEY_2026";

    /*
     * Gera um token JWT com validade de 24 horas.
     */
    public String gerarToken(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(SignatureAlgorithm.HS256, SECRET.getBytes())
                .compact();
    }
}