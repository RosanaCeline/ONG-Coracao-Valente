package com.coracaovalente.backend.model.financial;

public enum DonationType {
    DINHEIRO("Dinheiro"),
    ITENS("Itens"),
    SERVICO("Serviço");

    private final String title;

    DonationType(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}
