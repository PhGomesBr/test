package org.example.repositories;

import org.example.entities.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    // Conta quantos produtos têm o estoque abaixo de 5
    long countByProQuantidadeEstoqueLessThan(int quantidade);
    //metodo parra a lista de produtos com estoque baixo
    List<Produto> findByProQuantidadeEstoqueLessThan(int quantidade);
}