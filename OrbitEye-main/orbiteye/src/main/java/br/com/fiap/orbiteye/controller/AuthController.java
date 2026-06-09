package br.com.fiap.orbiteye.controller;

import br.com.fiap.orbiteye.dto.LoginRequest;
import br.com.fiap.orbiteye.dto.LoginResponse;
import br.com.fiap.orbiteye.entity.Usuario;
import br.com.fiap.orbiteye.repository.UsuarioRepository;
import br.com.fiap.orbiteye.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

/*
 * Controller responsável pela autenticação real do OrbitEye.
 * Valida e-mail e senha na tabela TB_USUARIO e retorna um JWT.
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;

    public AuthController(JwtService jwtService, UsuarioRepository usuarioRepository) {
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        Usuario usuario = usuarioRepository.findByDsEmail(request.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário ou senha inválidos"));

        if (!usuario.getDsSenha().equals(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário ou senha inválidos");
        }

        String token = jwtService.gerarToken(usuario.getDsEmail());

        return new LoginResponse(
                token,
                usuario.getIdUsuario(),
                usuario.getNmUsuario(),
                usuario.getDsEmail()
        );
    }
}
