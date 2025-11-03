package udb.edu.sv.desafio3.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import udb.edu.sv.desafio3.dto.UsuariosDTo;
import udb.edu.sv.desafio3.model.Usuarios;
import udb.edu.sv.desafio3.repository.UsuariosRepository;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuariosController {

    @Autowired
    private UsuariosRepository usuariosRepository;

    //Crear un usuario
    @Operation(summary = "Crear un nuevo usuario", description = "Crea un nuevo usuario con nombre, apellido, email y fecha de nacimiento")
    @ApiResponse(responseCode = "200", description = "Usuario creado exitosamente")
    @ApiResponse(responseCode = "400", description = "Error de validación")
    @PostMapping
    public ResponseEntity<Usuarios> crearUsuario(@Valid @RequestBody UsuariosDTo usuariosDTo) {
        Usuarios nuevoUsuario = new Usuarios();
        nuevoUsuario.setNombre(usuariosDTo.getNombre());
        nuevoUsuario.setApellido(usuariosDTo.getApellido());
        nuevoUsuario.setEmail(usuariosDTo.getEmail());
        nuevoUsuario.setFechanac(usuariosDTo.getFechaNacimiento());

        Usuarios savedUsuario = usuariosRepository.save(nuevoUsuario);
        return ResponseEntity.ok(savedUsuario);
    }

    @Operation(summary = "Obtener todos los usuarios", description = "Recupera la lista de todos los usuarios")
    @ApiResponse(responseCode = "200", description = "Lista de usuarios recuperada exitosamente")
    @GetMapping
    public ResponseEntity<List<Usuarios>> listarUsuarios() {
        return ResponseEntity.ok(usuariosRepository.findAll());
    }

    @Operation(summary = "Obtener usuario por ID", description = "Recupera un usuario específico por su ID")
    @ApiResponse(responseCode = "200", description = "Usuario encontrado")
    @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    @GetMapping("/{id}")
    public ResponseEntity<Usuarios> obtenerPorId(@PathVariable Long id) {
        return usuariosRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //Actualizar un usuario
    @Operation(summary = "Actualizar un usuario", description = "Actualiza la información de un usuario existente por ID")
    @ApiResponse(responseCode = "200", description = "Usuario actualizado exitosamente")
    @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    @PutMapping("/{id}")
    public ResponseEntity<Usuarios> actualizarUsuario(@PathVariable Long id, @Valid @RequestBody UsuariosDTo usuariosDTo) {
        return usuariosRepository.findById(id)
                .map(usuarioExistente -> {
                    usuarioExistente.setNombre(usuariosDTo.getNombre());
                    usuarioExistente.setApellido(usuariosDTo.getApellido());
                    usuarioExistente.setEmail(usuariosDTo.getEmail());
                    usuarioExistente.setFechanac(usuariosDTo.getFechaNacimiento());
                    return ResponseEntity.ok(usuariosRepository.save(usuarioExistente));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    //Eliminar un usuario
    @Operation(summary = "Eliminar un usuario", description = "Elimina un usuario existente por ID")
    @ApiResponse(responseCode = "204", description = "Usuario eliminado exitosamente")
    @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        if (usuariosRepository.existsById(id)) {
            usuariosRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}