package org.example.repositories;

import org.example.entities.VendaItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendaItemRepository extends JpaRepository<VendaItem, Long> {
    // Query para somar quantidade vendida por produto por semana
    @Query("SELECT p.proId, p.proNome, FUNCTION('YEAR', v.venData) as ano, FUNCTION('WEEK', v.venData) as semana, SUM(vi.quantidade) as totalQuantidade " +
            "FROM VendaItem vi " +
            "JOIN vi.venda v " +
            "JOIN vi.produto p " +
            "GROUP BY p.proId, p.proNome, FUNCTION('YEAR', v.venData), FUNCTION('WEEK', v.venData) " +
            "ORDER BY ano, semana, totalQuantidade DESC")
    List<Object[]> findQuantidadeVendidaPorProdutoPorSemana();
}