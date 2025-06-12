package org.example.services;

import org.example.dto.FornecedorDto;
import org.example.entities.Fornecedor;
import org.example.repositories.FornecedorRepository;
import org.example.services.exeptions.ResourceNotFoundException;
import org.example.services.exeptions.ValueBigForAtributeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FornecedorService {

    @Autowired
    private FornecedorRepository repository;

    public List<Fornecedor> findAll() {
        return repository.findAll();
    }

    public Fornecedor findById(Long id) {
        Optional<Fornecedor> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public Fornecedor insert(Fornecedor obj) {
        try {
            obj.setForId(null);
            return repository.save(obj);
        } catch (DataIntegrityViolationException e) {
            throw new ValueBigForAtributeException(e.getMessage());
        }
    }

    public Fornecedor update(Long id, FornecedorDto objDto) {
        try {
            Fornecedor entity = findById(id);

            entity.setForCnpj(objDto.getForCnpj());
            entity.setForNomeFantasia(objDto.getForNomeFantasia());
            entity.setForRazaoSocial(objDto.getForRazaoSocial());

            return repository.save(entity);
        } catch (DataIntegrityViolationException e) {
            throw new ValueBigForAtributeException(e.getMessage());
        }
    }

    public void deleteFornecedor(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException(id);
        }
    }

    // Corrigido: agora retorna um Fornecedor a partir do DTO
    public Fornecedor fromDTO(FornecedorDto objDto) {
        return new Fornecedor(
                null, // id será gerado pelo banco
                objDto.getForNomeFantasia(),
                objDto.getForCnpj(),
                objDto.getForRazaoSocial()
        );
    }

    public FornecedorDto toNewDTO(Fornecedor obj) {
        FornecedorDto dto = new FornecedorDto();

        dto.setForId(obj.getForId());
        dto.setForNomeFantasia(obj.getForNomeFantasia());
        dto.setForCnpj(obj.getForCnpj());
        dto.setForRazaoSocial(obj.getForRazaoSocial());

        return dto;
    }
}