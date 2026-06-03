package com.coracaovalente.backend.model.animal;

public enum Race {
    DOG("dog"),
    CAT("cat");

    private final String race;

    Race(String race) {
        this.race = race;
    }
}