package com.coracaovalente.backend.model.financial;

public enum ExpenseCategory {
    CASTRAMOVEL("Castramóvel"),
    ALIMENTACAO("Alimentação"),
    VETERINARIO("Veterinário"),
    VACINAS("Vacinas e medicamentos"),
    ABRIGO("Manutenção do abrigo"),
    TRANSPORTE("Transporte"),
    OUTROS("Outros");

    private final String title;

    ExpenseCategory(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}
