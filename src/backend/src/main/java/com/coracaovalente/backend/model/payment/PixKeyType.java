package com.coracaovalente.backend.model.payment;

public enum PixKeyType {
    CPF("cpf"),
    CNPJ("cnpj"),
    EMAIL("email"),
    PHONE("phone"),
    RANDOM("random");

    private String type;

    PixKeyType(String type) {
        this.type = type;
    }

    public String pixKeyType() {
        return type;
    }
}
