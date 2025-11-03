package udb.edu.sv.desafio3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import udb.edu.sv.desafio3.model.SuscripcionesDeUsuario;

public interface SuscriUsuariosRepository extends JpaRepository<SuscripcionesDeUsuario, Long> {
}
