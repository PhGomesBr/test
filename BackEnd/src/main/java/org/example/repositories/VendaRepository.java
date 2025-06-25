package org.example.repositories;

import org.example.entities.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {

    // Retorna semana do ano e soma do valor total das vendas dessa semana
    @Query("SELECT FUNCTION('YEAR', v.venData) as ano, FUNCTION('WEEK', v.venData) as semana, SUM(v.valorTotal) " +
            "FROM Venda v " +
            "GROUP BY FUNCTION('YEAR', v.venData), FUNCTION('WEEK', v.venData) " +
            "ORDER BY ano, semana")
    List<Object[]> findTotalVendasPorSemana();
}
