package org.example.services;

import org.example.dto.FornecedorDto;
import org.example.entities.Fornecedor;
import org.example.entities.Contato;
import org.example.entities.Endereco;
import org.example.repositories.FornecedorRepository;
import org.example.repositories.EnderecoRepository;
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

    @Autowired
    private EnderecoRepository enderecoRepository;

    public List<Fornecedor> findAll() {
        return repository.findAll();
    }

    public Fornecedor findById(Long id) {
        Optional<Fornecedor> obj = repository.findById(id);
        return obj.orElseThrow(() ->
                new ResourceNotFoundException(id));
    }

    public Fornecedor insert( Fornecedor obj) {
        try {
            obj.setForId(null);
            obj = repository.save(obj);
            enderecoRepository.saveAll(obj.getEnderecos());
            return obj;
        } catch (DataIntegrityViolationException e) {
            throw new ValueBigForAtributeException(e
                    .getMessage());
        }
    }

    public Fornecedor update(Long Id, FornecedorDto objDto) {
        try {
            Fornecedor entity = findById(Id);

            //Atualiza os dados os fornecedor
            entity.setForRazaoSocial(objDto.getForRazaoSocial());
            entity.setForRazaoSocial(objDto.getForRazaoSocial());
            entity.setForCnpj(objDto.getForCnpj());

            //Atualiza os dados os fornecedor
            Endereco endereco = entity.getEnderecos().get(0);

            //Assuindo que ha apenas um endereço por fornecedor
            endereco.setEndRua(objDto.getEndRua());
            endereco.setEndNumero(objDto.getEndNumero());
            endereco.setEndCidade(objDto.getEndCidade());
            endereco.setEndCep(objDto.getEndCep());
            endereco.setEndEstado(objDto.getEndEstado());

            //Atualiza o contato
            Contato contato = entity.getContatos().get(0);

            //Assumindo que ha apenas um contato por fornecedor
            contato.setConCelular(objDto.getConCelular());
            contato.setConTelefoneComercial(objDto.getConTelefoneComercial());
            contato.setConEmail(objDto.getConEmail());

            //Salva as alterações
            repository.save(entity);
            return entity;
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

    public Fornecedor fromDTO(FornecedorDto objDto) {
        Fornecedor fornec = new Fornecedor(null, objDto.getForNomeFantasia(), objDto.getForRazaoSocial(), objDto.getForCnpj(), objDto.getForId());

        Endereco ender = new Endereco(null, fornec, objDto.getEndRua(), objDto.getEndNumero(),
                objDto.getEndCidade(), objDto.getEndCep(),
                objDto.getEndEstado());

        Contato contato = new Contato(null, fornec, objDto.getConCelular(), objDto.getConTelefoneComercial(),
                objDto.getConEmail());

        fornec.getEnderecos().add(ender);
        fornec.getContatos().add(contato);

        return fornec;
    }

    public FornecedorDto toNewDto(Fornecedor obj) {
        FornecedorDto dto = new FornecedorDto();

// Mapeie os atributos comuns entre Fornecedor e FornecedorNewDTO
        dto.setForId(obj.getForId());
        dto.setForNomeFantasia(obj.getForNomeFantasia());
        dto.setForRazaoSocial(obj.getForRazaoSocial());
        dto.setForCnpj(obj.getForCnpj());

// Atributos específicos de Endereco
        Endereco endereco = obj.getEnderecos().get(0);
        dto.setEndRua(endereco.getEndRua());
        dto.setEndNumero(endereco.getEndNumero());
        dto.setEndCidade(endereco.getEndCidade());
        dto.setEndCep(endereco.getEndCep());
        dto.setEndEstado(endereco.getEndEstado());

// Atributos específicos de Contato
        Contato contato = obj.getContatos().get(0);
        dto.setConCelular(contato.getConCelular());
        dto.setConTelefoneComercial(contato.getConTelefoneComercial());
        dto.setConEmail(contato.getConEmail());

        return dto;
    }
}
