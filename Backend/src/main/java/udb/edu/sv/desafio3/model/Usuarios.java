package udb.edu.sv.desafio3.model;

import jakarta.persistence.*;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "usuario")
public class Usuarios {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellido;

    @Column(nullable = false, unique = true)
    private String email;

    private LocalDate fechanac;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    // Getters y setters
  public void setId(Long id) {
      this.id = id;
  }
  public Long getId() {
      return id;
  }

  public void setNombre(String nombre) {
      this.nombre = nombre;
  }
  public String getNombre() {
      return nombre;
  }

  public void setApellido(String apellido) {
      this.apellido = apellido;
  }
  public String getApellido() {
      return apellido;
  }

  public void setEmail(String email) {
      this.email = email;
  }
  public String getEmail() {
      return email;
  }

  public void setFechanac(LocalDate fechanac) {
      this.fechanac = fechanac;
  }
  public LocalDate getFechanac() {
      return fechanac;
  }

  public void setUsername(String username) {
      this.username = username;
  }
  public String getUsername() {
      return username;
  }

  public void setPassword(String password) {
      this.password = password;
  }
  public String getPassword() {
      return password;
  }
}