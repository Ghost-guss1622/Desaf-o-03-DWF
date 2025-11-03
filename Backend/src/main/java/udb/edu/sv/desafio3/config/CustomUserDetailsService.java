package udb.edu.sv.desafio3.config;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import udb.edu.sv.desafio3.model.Usuarios;
import udb.edu.sv.desafio3.repository.UsuariosRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuariosRepository userRepository;

    public CustomUserDetailsService(UsuariosRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuarios user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        return User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }
}