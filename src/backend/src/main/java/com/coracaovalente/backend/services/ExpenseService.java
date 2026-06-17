package com.coracaovalente.backend.services;

import com.coracaovalente.backend.data.dto.request.ExpenseRequestDTO;
import com.coracaovalente.backend.data.dto.response.ExpenseBreakdownDTO;
import com.coracaovalente.backend.exception.ExpenseNotFoundException;
import com.coracaovalente.backend.model.financial.Expense;
import com.coracaovalente.backend.model.financial.ExpenseCategory;
import com.coracaovalente.backend.repository.ExpenseRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public List<Expense> getExpenses() {
        return expenseRepository.findAllByOrderByDateDescIdDesc();
    }

    public List<ExpenseBreakdownDTO> getBreakdown() {
        return expenseRepository.findBreakdownByCategory()
                .stream()
                .map(row -> {
                    ExpenseCategory category = (ExpenseCategory) row[0];
                    BigDecimal total = (BigDecimal) row[1];
                    return new ExpenseBreakdownDTO(category.name(), category.getTitle(), total);
                })
                .toList();
    }

    @Transactional
    public Expense addExpense(ExpenseRequestDTO request) {
        Expense expense = new Expense();
        expense.setCategory(request.category());
        expense.setDescription(request.description());
        expense.setValue(request.value());
        expense.setDate(request.date());
        return expenseRepository.save(expense);
    }

    @Transactional
    public Expense updateExpense(Long id, ExpenseRequestDTO request) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(ExpenseNotFoundException::new);

        expense.setCategory(request.category());
        expense.setDescription(request.description());
        expense.setValue(request.value());
        expense.setDate(request.date());
        return expenseRepository.save(expense);
    }

    @Transactional
    public void deleteExpense(Long id) {
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(ExpenseNotFoundException::new);
        expenseRepository.delete(expense);
    }
}
