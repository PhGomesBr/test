package org.example.services;

import org.example.entities.Fornecedor;
import org.example.repositories.FornecedorRepository;
import org.example.services.exeptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FornecedorService {

    @Autowired
    private FornecedorRepository repository;

    public List<Fornecedor> getAll() {
        return repository.findAll();
    }

    public Fornecedor findById(Long id) {
        Optional<Fornecedor> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Fornecedor insert(Fornecedor fornecedor) {
        return repository.save(fornecedor);
    }

    public boolean update(Long id, Fornecedor fornecedor) {
        Optional<Fornecedor> optionalFornecedor = repository.findById(id);
        if (optionalFornecedor.isPresent()) {
            Fornecedor fornecedorSistema = optionalFornecedor.get();
            fornecedorSistema.setForRazaoSocial(fornecedor.getForRazaoSocial());
            fornecedorSistema.setForCnpj(fornecedor.getForCnpj());
            fornecedorSistema.setForNomeFantasia(fornecedor.getForNomeFantasia());
            repository.save(fornecedorSistema);
            return true;
        }
        return false;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
