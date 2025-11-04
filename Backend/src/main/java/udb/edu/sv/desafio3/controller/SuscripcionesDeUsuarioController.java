package udb.edu.sv.desafio3.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import udb.edu.sv.desafio3.dto.SuscUsersDTo;
import udb.edu.sv.desafio3.dto.SuscUsersResponseDto;
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
@CrossOrigin(origins = "http://localhost:5173")
public class SuscripcionesDeUsuarioController {

    @Autowired
    private SuscriUsuariosRepository suscripcionesDeUsuarioRepository;

    @Autowired
    private UsuariosRepository usuariosRepository;

    @Autowired
    private SuscripcionRepository suscripcionRepository;

    // ✅ CREAR SUSCRIPCIÓN
    @PostMapping
    public ResponseEntity<SuscripcionesDeUsuario> crearSuscripcionDeUsuario(
            @Valid @RequestBody SuscUsersDTo dto) {

        Optional<Usuarios> usuarioOpt = usuariosRepository.findById(dto.getIdUsuario());
        Optional<Suscripcion> planOpt = suscripcionRepository.findById(dto.getIdSuscripcion());

        if (usuarioOpt.isEmpty() || planOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        SuscripcionesDeUsuario nueva = new SuscripcionesDeUsuario();
        nueva.setUsuario(usuarioOpt.get());
        nueva.setSuscripcion(planOpt.get());
        nueva.setFechaInicio(dto.getFechaInicio());
        nueva.setFechaFin(dto.getFechaInicio().plusMonths(planOpt.get().getDuracionMeses()));
        nueva.setEstado("ACTIVA");

        return ResponseEntity.ok(suscripcionesDeUsuarioRepository.save(nueva));
    }

    // ✅ LISTAR TODAS — AHORA CON DTO CORREGIDO
    @GetMapping
    public ResponseEntity<List<SuscUsersResponseDto>> listarSuscripciones() {

        List<SuscUsersResponseDto> lista = suscripcionesDeUsuarioRepository.findAll()
                .stream()
                .map(s -> new SuscUsersResponseDto(
                        s.getId(),
                        s.getUsuario().getId(),
                        s.getSuscripcion().getId(),
                        s.getFechaInicio(),
                        s.getFechaFin(),
                        s.getEstado()
                ))
                .toList();

        return ResponseEntity.ok(lista);
    }

    // ✅ OBTENER POR ID
    @GetMapping("/{id}")
    public ResponseEntity<SuscUsersResponseDto> obtenerPorId(@PathVariable Long id) {

        return suscripcionesDeUsuarioRepository.findById(id)
                .map(s -> new SuscUsersResponseDto(
                        s.getId(),
                        s.getUsuario().getId(),
                        s.getSuscripcion().getId(),
                        s.getFechaInicio(),
                        s.getFechaFin(),
                        s.getEstado()
                ))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ ACTUALIZAR
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarSuscripciones(
            @PathVariable Long id,
            @Valid @RequestBody SuscUsersDTo dto) {

        Optional<SuscripcionesDeUsuario> existenteOpt = suscripcionesDeUsuarioRepository.findById(id);
        if (existenteOpt.isEmpty()) return ResponseEntity.notFound().build();

        Optional<Usuarios> usuarioOpt = usuariosRepository.findById(dto.getIdUsuario());
        Optional<Suscripcion> planOpt = suscripcionRepository.findById(dto.getIdSuscripcion());
        if (usuarioOpt.isEmpty() || planOpt.isEmpty()) return ResponseEntity.badRequest().build();

        SuscripcionesDeUsuario existente = existenteOpt.get();
        existente.setUsuario(usuarioOpt.get());
        existente.setSuscripcion(planOpt.get());
        existente.setFechaInicio(dto.getFechaInicio());
        existente.setFechaFin(dto.getFechaInicio().plusMonths(planOpt.get().getDuracionMeses()));
        existente.setEstado(dto.getEstado() != null ? dto.getEstado() : "ACTIVA");

        return ResponseEntity.ok(suscripcionesDeUsuarioRepository.save(existente));
    }

    // ✅ ELIMINAR
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSuscripcion(@PathVariable Long id) {
        if (suscripcionesDeUsuarioRepository.existsById(id)) {
            suscripcionesDeUsuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}