package com.coracaovalente.backend.services;

import com.coracaovalente.backend.data.dto.request.SusFormRequestDTO;
import com.coracaovalente.backend.model.form.SusForm;
import com.coracaovalente.backend.repository.SusFormRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SusFormService {

    private final SusFormRepository susFormRepository;

    public void answerForm (SusFormRequestDTO request) {
        if (request.isTermAccepted() != true) {
            throw new IllegalArgumentException("Aceitar o TCLE é obrigatório para responder o formulário");
        }

        double score = calculateSusScore(List.of(
                request.q1(), request.q2(),
                request.q3(), request.q4(),
                request.q5(), request.q6(),
                request.q7(), request.q8(),
                request.q9(), request.q10()
        ));

        SusForm form = new SusForm(
                null, request.q1(), request.q2(),
                request.q3(), request.q4(), request.q5(),
                request.q6(), request.q7(), request.q8(),
                request.q9(), request.q10(), score,
                LocalDateTime.now(ZoneId.of("America/Sao_Paulo")),
                request.isTermAccepted()
        );

        susFormRepository.save(form);
    }

    public static double calculateSusScore(List<Integer> answers) {
        if (answers.size() != 10) {
            throw new IllegalArgumentException("O SUS deve possuir 10 respostas.");
        }

        int total = 0;

        for (int i = 0; i < answers.size(); i++) {
            int answer = answers.get(i);

            if ((i + 1) % 2 == 1) { // questão ímpar
                total += answer - 1;
            } else { // questão par
                total += 5 - answer;
            }
        }

        return total * 2.5;
    }
}
