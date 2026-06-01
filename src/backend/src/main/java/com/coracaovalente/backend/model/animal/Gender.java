package com.coracaovalente.backend.model.animal;

public enum Gender {
    MALE("male"),
    FEMALE("female");

    private final String gender;

    Gender(String gender) {
        this.gender = gender;
    }
}