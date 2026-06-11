package com.coracaovalente.backend.util;

import java.text.Normalizer;
import java.util.Locale;

public class QrCodeBuilder {

    public static String build(String pixKey, String pixKeyType,
                               String name, String city,
                               String description, Double amount) {

        String merchantName = truncate(removeAccents(name), 25);
        String merchantCity = truncate(removeAccents(city), 15);
        String infoAdicional = description != null
                ? truncate(removeAccents(description), 72)
                : "doacao";

        // Campo 26 — Merchant Account Info (chave Pix)
        String gui = field("00", "BR.GOV.BCB.PIX");
        String key = field("01", pixKey);
        String info = description != null
                ? field("02", truncate(removeAccents(description), 72))
                : "";
        String mae = field("26", gui + key + info);

        // Campo 54 — valor (opcional)
        String valorField = "";
        if (amount != null && amount > 0) {
            valorField = field("54", String.format(Locale.US, "%.2f", amount));
        }

        // Campo 62 — Additional Data Field (txid)
        String txid = field("05", truncate(infoAdicional, 25));
        String additionalData = field("62", txid);

        // Monta o payload sem o CRC
        String payload =
                field("00", "01") +          // Payload Format Indicator
                        field("01", "12") +          // Point of Initiation (12 = reutilizável)
                        mae +                         // Merchant Account Info
                        field("52", "0000") +         // MCC
                        field("53", "986") +          // Transaction Currency (BRL)
                        valorField +
                        field("58", "BR") +           // Country Code
                        field("59", merchantName) +   // Merchant Name
                        field("60", merchantCity) +   // Merchant City
                        additionalData;

        // CRC16 obrigatório
        String crcInput = payload + "6304";
        String crc = crc16(crcInput);

        return payload + field("63", crc);
    }

    private static String field(String id, String value) {
        return id + String.format("%02d", value.length()) + value;
    }

    private static String truncate(String value, int max) {
        if (value == null) return "";
        return value.length() > max ? value.substring(0, max) : value;
    }

    private static String crc16(String payload) {
        int crc = 0xFFFF;
        for (char c : payload.toCharArray()) {
            crc ^= (c << 8);
            for (int i = 0; i < 8; i++) {
                crc = (crc & 0x8000) != 0 ? (crc << 1) ^ 0x1021 : crc << 1;
            }
        }
        return String.format("%04X", crc & 0xFFFF);
    }

    private static String removeAccents(String text) {
        if (text == null) {
            return "";
        }

        return Normalizer
                .normalize(text, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
    }
}
