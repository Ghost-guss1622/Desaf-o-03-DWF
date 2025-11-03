package udb.edu.sv.desafio3.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import udb.edu.sv.desafio3.dto.SuscUsersDTo;
import udb.edu.sv.desafio3.model.Suscripcion;
import udb.edu.sv.desafio3.model.SuscripcionesDeUsuario;
import udb.edu.sv.desafio3.model.Usuarios;
import udb.edu.sv.desafio3.repository.SuscriUsuariosRepository;
import udb.edu.sv.desafio3.repository.SuscripcionRepository;
import udb.edu.sv.desafio3.repository.UsuariosRepository;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/suscripciones_de_usuarios")
public class SuscripcionesDeUsuarioController {

    @Autowired
    private SuscriUsuariosRepository suscripcionesDeUsuarioRepository;

    @Autowired
    private UsuariosRepository usuariosRepository;

    @Autowired
    private SuscripcionRepository suscripcionRepository;

    @Operation(summary = "Crear una nueva suscripción de usuario", description = "Asocia un usuario a un plan de suscripción.")
    @ApiResponse(responseCode = "200", description = "Suscripción de usuario creada exitosamente")
    @ApiResponse(responseCode = "400", description = "Error de validación o ID de usuario/suscripción no encontrado")
    @PostMapping
    public ResponseEntity<SuscripcionesDeUsuario> crearSuscripcionDeUsuario(@Valid @RequestBody SuscUsersDTo dto) {
        Optional<Usuarios> usuarioOpt = usuariosRepository.findById(dto.getIdUsuario());
        Optional<Suscripcion> planOpt = suscripcionRepository.findById(dto.getIdSuscripcion());

        //Validacion para encontrar un usuario o suscripcion
        if (usuarioOpt.isEmpty() || planOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        SuscripcionesDeUsuario nuevaSuscripcion = new SuscripcionesDeUsuario();
        nuevaSuscripcion.setUsuario(usuarioOpt.get());
        nuevaSuscripcion.setSuscripcion(planOpt.get());
        nuevaSuscripcion.setFechaInicio(dto.getFechaInicio());
        nuevaSuscripcion.setFechaFin(dto.getFechaInicio().plusMonths(planOpt.get().getDuracionMeses()));
        nuevaSuscripcion.setEstado("ACTIVA");

        SuscripcionesDeUsuario saved = suscripcionesDeUsuarioRepository.save(nuevaSuscripcion);
        return ResponseEntity.ok(saved);
    }

    @Operation(summary = "Obtener todas las suscripciones de usuario", description = "Recupera la lista de todas las suscripciones de usuario")
    @ApiResponse(responseCode = "200", description = "Lista de suscripciones recuperada exitosamente")
    @GetMapping
    public ResponseEntity<List<SuscripcionesDeUsuario>> listarSuscripciones() {
        return ResponseEntity.ok(suscripcionesDeUsuarioRepository.findAll());
    }

    @Operation(summary = "Obtener suscripción de usuario por ID", description = "Recupera una suscripción de usuario específica por su ID")
    @ApiResponse(responseCode = "200", description = "Suscripción de usuario encontrada")
    @ApiResponse(responseCode = "404", description = "Suscripción de usuario no encontrada")
    @GetMapping("/{id}")
    public ResponseEntity<SuscripcionesDeUsuario> obtenerPorId(@PathVariable Long id) {
        return suscripcionesDeUsuarioRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Actualizar una suscripcion
    @Operation(summary = "Actualizar una suscripción de usuario", description = "Actualiza la información de una suscripción de usuario existente por ID")
    @ApiResponse(responseCode = "200", description = "Suscripción de usuario actualizada exitosamente")
    @ApiResponse(responseCode = "400", description = "Error de validación o ID de usuario/suscripción no encontrado")
    @ApiResponse(responseCode = "404", description = "Suscripción de usuario no encontrada")
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarSuscripciones(@PathVariable Long id, @Valid @RequestBody SuscUsersDTo dto) {
        Optional<SuscripcionesDeUsuario> suscripcionExistenteOpt = suscripcionesDeUsuarioRepository.findById(id);
        if (suscripcionExistenteOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Usuarios> usuarioOpt = usuariosRepository.findById(dto.getIdUsuario());
        Optional<Suscripcion> planOpt = suscripcionRepository.findById(dto.getIdSuscripcion());
        if (usuarioOpt.isEmpty() || planOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        SuscripcionesDeUsuario suscripcionExistente = suscripcionExistenteOpt.get();
        suscripcionExistente.setUsuario(usuarioOpt.get());
        suscripcionExistente.setSuscripcion(planOpt.get());
        suscripcionExistente.setFechaInicio(dto.getFechaInicio());
        suscripcionExistente.setFechaFin(dto.getFechaInicio().plusMonths(planOpt.get().getDuracionMeses()));
        suscripcionExistente.setEstado("ACTIVA");

        SuscripcionesDeUsuario updated = suscripcionesDeUsuarioRepository.save(suscripcionExistente);
        return ResponseEntity.ok(updated);
    }
//Actualizar una suscripcion
    @Operation(summary = "Eliminar una suscripción de usuario", description = "Elimina una suscripción de usuario existente por ID")
    @ApiResponse(responseCode = "204", description = "Suscripción de usuario eliminada exitosamente")
    @ApiResponse(responseCode = "404", description = "Suscripción de usuario no encontrada")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSuscripcion(@PathVariable Long id) {
        if (suscripcionesDeUsuarioRepository.existsById(id)) {
            suscripcionesDeUsuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}