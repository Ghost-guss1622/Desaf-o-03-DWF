package udb.edu.sv.desafio3.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import udb.edu.sv.desafio3.dto.SuscripcionesDTo;
import udb.edu.sv.desafio3.model.Suscripcion;
import udb.edu.sv.desafio3.repository.SuscripcionRepository;


import java.util.List;

@RestController
@RequestMapping("/api/suscripciones")
public class SuscripcionController {

    @Autowired
    private SuscripcionRepository suscripcionRepository;

    //Crear una nueva suscripcion
    @Operation(summary = "Crear una nueva suscripción", description = "Crea una nueva suscripción con nombre, tipo, duración (meses) y precio")
    @ApiResponse(responseCode = "200", description = "Suscripción creada exitosamente")
    @ApiResponse(responseCode = "400", description = "Error de validación")
    @PostMapping
    public ResponseEntity<Suscripcion> crearSuscripcion(@Valid @RequestBody SuscripcionesDTo suscripcionDTo) {
        Suscripcion suscrip = new Suscripcion();
        suscrip.setNombre(suscripcionDTo.getNombre());
        suscrip.setTipo(suscripcionDTo.getTipo());
        suscrip.setDuracionMeses(suscripcionDTo.getDuracionMeses());
        suscrip.setPrecio(suscripcionDTo.getPrecio());
        suscrip.setEstado("Activo");

        Suscripcion suscripciones = suscripcionRepository.save(suscrip);
        return ResponseEntity.ok(suscripciones);
    }

    @Operation(summary = "Obtener todas las suscripciones", description = "Recupera la lista de todas las suscripciones")
    @ApiResponse(responseCode = "200", description = "Lista de suscripciones recuperada exitosamente")
    @GetMapping
    public ResponseEntity<List<Suscripcion>> listarSuscripciones() {
        return ResponseEntity.ok(suscripcionRepository.findAll());
    }

    @Operation(summary = "Obtener suscripción por ID", description = "Recupera una suscripción específica por su ID")
    @ApiResponse(responseCode = "200", description = "Suscripción encontrada")
    @ApiResponse(responseCode = "404", description = "Suscripción no encontrada")
    @GetMapping("/{id}")
    public ResponseEntity<Suscripcion> obtenerPorId(@PathVariable Long id) {
        return suscripcionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //Actualizar una suscripcion
    @Operation(summary = "Actualizar una suscripción", description = "Actualiza la información de una suscripción existente por ID")
    @ApiResponse(responseCode = "200", description = "Suscripción actualizada exitosamente")
    @ApiResponse(responseCode = "404", description = "Suscripción no encontrada")
    @PutMapping("/{id}")
    public ResponseEntity<Suscripcion> actualizarSucripciones(@PathVariable Long id, @Valid @RequestBody SuscripcionesDTo suscripcionesDTo) {
        return suscripcionRepository.findById(id)
                .map(suscripcionExistente -> {
                    suscripcionExistente.setNombre(suscripcionesDTo.getNombre());
                    suscripcionExistente.setTipo(suscripcionesDTo.getTipo());
                    suscripcionExistente.setDuracionMeses(suscripcionesDTo.getDuracionMeses());
                    suscripcionExistente.setPrecio(suscripcionesDTo.getPrecio());
                    return ResponseEntity.ok(suscripcionRepository.save(suscripcionExistente));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    //Elimanr una suscripcion
    @Operation(summary = "Eliminar una suscripción", description = "Elimina una suscripción existente por ID")
    @ApiResponse(responseCode = "204", description = "Suscripción eliminada exitosamente")
    @ApiResponse(responseCode = "404", description = "Suscripción no encontrada")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSuscripcion(@PathVariable Long id) {
        if (suscripcionRepository.existsById(id)) {
            suscripcionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}