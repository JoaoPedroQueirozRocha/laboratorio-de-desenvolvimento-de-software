package com.example.project_2.model;

import java.io.Serializable;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Base64;
import java.util.concurrent.atomic.AtomicLong;
import io.swagger.v3.oas.annotations.media.Schema;

public abstract class User implements Serializable {

    private Long id;

    @Schema(description = "Nome do usuário", example = "João Silva")
    private String name;

    @Schema(description = "Email do usuário", example = "joao.silva@email.com")
    private String email;

    @Schema(description = "Senha do usuário", example = "senha123")
    private String password;

    @Schema(hidden = true)
    private ArrayList<Vehicle> vehicle;

    @Schema(name = "user_token", description = "Token do usuário", example = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
    private String userToken;

    @Schema(description = "Papel do usuário", example = "CLIENTE")
    private String role;

    public User(Long id, String name, String email, String password, Vehicle vehicle, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.vehicle = new ArrayList<Vehicle>();
        this.role = role;
    }

    public User(String name, String email, String password, String role) {
        this.id = null;
        this.name = name;
        this.email = email;
        this.password = password;
        this.vehicle = new ArrayList<Vehicle>();
        this.role = role;
    }

    public void addVehicle(Vehicle vehicle) {
        this.vehicle.add(vehicle);
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User() {
        this.vehicle = new ArrayList<Vehicle>();
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ArrayList<Vehicle> getVehicle() {
        return this.vehicle;
    }

    public void setVehicle(ArrayList<Vehicle> vehicle) {
        this.vehicle = vehicle;
    }

    public User getUser() {
        return this;
    }

    public String getUserToken() {
        return this.userToken;
    }

    public void setUserToken(String userToken) {
        this.userToken = userToken;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
