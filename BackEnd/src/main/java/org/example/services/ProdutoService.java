package org.example.services;

import org.example.entities.Fornecedor;
import org.example.entities.Produto;
import org.example.repositories.FornecedorRepository;
import org.example.repositories.ProdutoRepository;
import org.example.services.exeptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    @Autowired
    private FornecedorRepository fornecedorRepository;

    public List<Produto> getAll() {
        return repository.findAll();
    }


    public void reduzirEstoque(Long produtoId, Integer quantidade) {
        Produto produto = repository.findById(produtoId)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));

        Integer estoqueAtual = produto.getProQuantidadeEstoque();
        if (estoqueAtual == null) {
            throw new IllegalStateException("Estoque do produto está nulo (produtoId = " + produtoId + ")");
        }

        if (quantidade > estoqueAtual) {
            throw new IllegalArgumentException("Estoque insuficiente para o produtoId = " + produtoId);
        }

        produto.setProQuantidadeEstoque(estoqueAtual - quantidade);
        repository.save(produto);
    }

    public Produto findById(Long id) {
        Optional<Produto> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException(id));
    }


    
    public Produto insert( Long forId,Produto obj) {
        Fornecedor fornecedor = fornecedorRepository.findById(forId)
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado com ID: "+forId));
        obj.setFornecedor(fornecedor);
        return repository.save(obj);
    }
    public boolean update(Long id, Produto obj) {
        Optional<Produto> optionalProduto = repository.findById(id);
        if (optionalProduto.isPresent()) {
            Produto produtoSistema = optionalProduto.get();
            produtoSistema.setProNome(obj.getProNome());
            produtoSistema.setProPrecoCusto(obj.getProPrecoCusto());
            produtoSistema.setProPrecoVenda(obj.getProPrecoVenda());
            produtoSistema.setProQuantidadeEstoque(obj.getProQuantidadeEstoque());
            produtoSistema.setProDescricao(obj.getProDescricao());
            produtoSistema.setProCodigoBarras(obj.getProCodigoBarras());
            produtoSistema.setProAtivo(obj.getProAtivo());
            produtoSistema.setProMarca(obj.getProMarca());
            produtoSistema.setProDataAtualizacao(obj.getProDataAtualizacao());
            produtoSistema.setProDataCadastro(obj.getProDataCadastro());
            produtoSistema.setProCategoria(obj.getProCategoria());
            produtoSistema.setFornecedor(obj.getFornecedor());

            repository.save(produtoSistema);
            return true;
        }
        return false;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    //aviso caso o produto estiiver abaixo do numero escolido
    public long contarProdutosComEstoqueBaixo() {
        return repository.countByProQuantidadeEstoqueLessThan(5);
    }

    //lista para os produtos com estoque baixo
    public List<Produto> findProdutosComEstoqueBaixo(int limite) {
        return repository.findByProQuantidadeEstoqueLessThan(limite);
    }
}
