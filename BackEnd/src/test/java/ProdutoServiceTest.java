package org.example.services;

import org.example.entities.Fornecedor;
import org.example.entities.Produto;
import org.example.repositories.FornecedorRepository;
import org.example.repositories.ProdutoRepository;
import org.example.services.exeptions.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ProdutoServiceTest {

    @InjectMocks
    private ProdutoService produtoService;

    @Mock
    private ProdutoRepository produtoRepository;

    @Mock
    private FornecedorRepository fornecedorRepository;

    private Produto produto;
    private Fornecedor fornecedor;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        fornecedor = new Fornecedor();
        fornecedor.setForId(1L);
        fornecedor.setForNomeFantasia("Moura");

        produto = new Produto(
                1L,
                "Bateria 60Ah",
                "Bateria automotiva 60 amperes",
                new BigDecimal("150.00"),
                new BigDecimal("220.00"),
                10,
                "Elétrica",
                "7891234567890",
                "Moura",
                "Unidade",
                "Sim",
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        produto.setFornecedor(fornecedor);
    }

    @Test
    void testFindByIdComSucesso() {
        when(produtoRepository.findById(1L)).thenReturn(Optional.of(produto));

        Produto resultado = produtoService.findById(1L);

        assertNotNull(resultado);
        assertEquals("Bateria 60Ah", resultado.getProNome());
        verify(produtoRepository, times(1)).findById(1L);
    }

    @Test
    void testFindByIdComFalha() {
        when(produtoRepository.findById(2L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> produtoService.findById(2L));
        verify(produtoRepository, times(1)).findById(2L);
    }

    @Test
    void testInsertComSucesso() {
        when(fornecedorRepository.findById(1L)).thenReturn(Optional.of(fornecedor));
        when(produtoRepository.save(any(Produto.class))).thenReturn(produto);

        Produto resultado = produtoService.insert(1L, produto);

        assertNotNull(resultado);
        assertEquals("Bateria 60Ah", resultado.getProNome());
        verify(fornecedorRepository, times(1)).findById(1L);
        verify(produtoRepository, times(1)).save(produto);
    }

    @Test
    void testUpdateComSucesso() {
        Produto novoProduto = new Produto(
                1L,
                "Amortecedor Dianteiro",
                "Amortecedor dianteiro esportivo",
                new BigDecimal("100.00"),
                new BigDecimal("180.00"),
                20,
                "Suspensão",
                "7890000000001",
                "Cofap",
                "Unidade",
                "Sim",
                LocalDateTime.now(),
                LocalDateTime.now()
        );
        novoProduto.setFornecedor(fornecedor);

        when(produtoRepository.findById(1L)).thenReturn(Optional.of(produto));
        when(produtoRepository.save(any(Produto.class))).thenReturn(novoProduto);

        boolean atualizado = produtoService.update(1L, novoProduto);

        assertTrue(atualizado);
        verify(produtoRepository, times(1)).save(any(Produto.class));
    }

    @Test
    void testUpdateComFalha() {
        Produto inexistente = new Produto();
        when(produtoRepository.findById(99L)).thenReturn(Optional.empty());

        boolean atualizado = produtoService.update(99L, inexistente);

        assertFalse(atualizado);
        verify(produtoRepository, never()).save(any(Produto.class));
    }

    @Test
    void testDeleteComSucesso() {
        doNothing().when(produtoRepository).deleteById(1L);

        assertDoesNotThrow(() -> produtoService.delete(1L));
        verify(produtoRepository, times(1)).deleteById(1L);
    }
}
