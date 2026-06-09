package br.com.fiap.orbiteye.repository;

import br.com.fiap.orbiteye.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/*
 * Repository da tabela TB_USUARIO.
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Busca usuário por email. Será usado no login JWT.
    Optional<Usuario> findByDsEmail(String dsEmail);
}