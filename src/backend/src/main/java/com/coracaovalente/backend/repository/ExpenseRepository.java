package com.coracaovalente.backend.repository;

import com.coracaovalente.backend.model.financial.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findAllByOrderByDateDescIdDesc();

    @Query("SELECT e.category, SUM(e.value) FROM Expense e GROUP BY e.category ORDER BY SUM(e.value) DESC")
    List<Object[]> findBreakdownByCategory();
}
