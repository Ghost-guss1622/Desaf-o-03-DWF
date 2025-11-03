package udb.edu.sv.desafio3.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class SuscUsersDTo {

    @NotNull(message = "El ID de usuario es obligatorio.")
    private Long idUsuario;

    @NotNull(message = "El ID de suscripción es obligatorio.")
    private Long idSuscripcion;

    @NotNull(message = "La fecha de inicio es obligatoria.")
    private LocalDate fechaInicio;

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Long getIdSuscripcion() {
        return idSuscripcion;
    }

    public void setIdSuscripcion(Long idSuscripcion) {
        this.idSuscripcion = idSuscripcion;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }
}
