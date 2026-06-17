package com.coracaovalente.backend.controller;

import com.coracaovalente.backend.controller.docs.ExpenseControllerDocs;
import com.coracaovalente.backend.data.dto.request.ExpenseRequestDTO;
import com.coracaovalente.backend.data.dto.response.ExpenseBreakdownDTO;
import com.coracaovalente.backend.model.financial.Expense;
import com.coracaovalente.backend.services.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expense")
@RequiredArgsConstructor
public class ExpenseController implements ExpenseControllerDocs {

    private final ExpenseService expenseService;

    @Override
    @GetMapping
    public ResponseEntity<List<Expense>> getExpenses() {
        return ResponseEntity.ok(expenseService.getExpenses());
    }

    @Override
    @GetMapping("/breakdown")
    public ResponseEntity<List<ExpenseBreakdownDTO>> getBreakdown() {
        return ResponseEntity.ok(expenseService.getBreakdown());
    }

    @Override
    @PostMapping
    public ResponseEntity<Expense> addExpense(@RequestBody @Valid ExpenseRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(expenseService.addExpense(request));
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody @Valid ExpenseRequestDTO request) {
        return ResponseEntity.ok(expenseService.updateExpense(id, request));
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}
