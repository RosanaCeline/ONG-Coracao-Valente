package com.coracaovalente.backend.model.user;

public enum UserRole {
    ADMIN("admin"),
    USER("user");

    private String role;

    UserRole(String role) {
        this.role = role;
    }

    public String userRole() {
        return role;
    }
}
