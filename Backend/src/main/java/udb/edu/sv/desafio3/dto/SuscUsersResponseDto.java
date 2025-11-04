package udb.edu.sv.desafio3.dto;

import java.time.LocalDate;

public class SuscUsersResponseDto {
    private Long id;
    private Long idUsuario;
    private Long idSuscripcion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private String estado;

    public SuscUsersResponseDto(Long id, Long idUsuario, Long idSuscripcion,
                                LocalDate fechaInicio, LocalDate fechaFin, String estado) {

        this.id = id;
        this.idUsuario = idUsuario;
        this.idSuscripcion = idSuscripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estado = estado;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Long getId() {
        return id;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }
    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdSuscripcion(Long idSuscripcion) {
        this.idSuscripcion = idSuscripcion;
    }
    public Long getIdSuscripcion() {
        return idSuscripcion;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }
    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }
    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
    public String getEstado() {
        return estado;
    }
}
