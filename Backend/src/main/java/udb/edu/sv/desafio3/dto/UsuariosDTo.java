package udb.edu.sv.desafio3.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class UsuariosDTo {
    @NotBlank(message = "El nombre es un campo obligatorio")
    @Size(min = 2, max = 15, message = "El nombre debe de tener 15 caracteres como maximo")
    private String nombre;

    @NotBlank(message = "El apellido es un campo obligatorio")
    private String apellido;

    @NotBlank(message = "El email es un campo obligatorio")
    @Email(message = "Formato de email inválido")
    private String email;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @Past(message = "La fecha de nacimiento no puede ser en el futuro")
    private LocalDate fechaNacimiento;

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }
    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }
    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }
}
