package org.example.entities;

import org.hibernate.validator.constraints.br.CNPJ;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Fornecedor implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FOR_ID")
    private Long forId;

    //chave estrangeira para produto
    @OneToMany(mappedBy = "fornecedor", cascade = CascadeType.ALL)
    private  List<Produto> produtos = new ArrayList<>();

    @OneToMany(mappedBy = "endCliente", cascade = CascadeType.ALL)
    private List<Endereco> enderecos = new ArrayList<>();

    @OneToMany(mappedBy = "conCliente", cascade = CascadeType.ALL)
    private List<Contato> contatos = new ArrayList<>();

    @NotBlank(message = "Nome da Fantasia é obrigatório!")
    @Size(max = 100, message = "Nome da Fantasia deve ter no máximo 100 caracteres!")
    @Column(name = "FOR_NOME_FANTASIA", length = 100, nullable = false)
    private String forNomeFantasia;

    @NotBlank(message = "CNPJ é obrigatório!")
    @CNPJ(message = "CNPJ inválido!")
    @Size(max = 14, message = "CNPJ deve ter no máximo 14 caracteres!")
    @Column(name = "FOR_CNPJ", unique = true, length = 14, nullable = false)
    private String forCnpj;

    @NotBlank(message = "Razão Social é obrigatório!")
    @Size(max = 100, message = "Razão Social deve ter no máximo 100 caracteres!")
    @Column(name = "FOR_RAZAO_SOCIAL", length = 100, nullable = false)
    private String forRazaoSocial;


    public Fornecedor() {
    }

    public Fornecedor(Object o, String forNomeFantasia, String forCnpj, String forRazaoSocial) {
        this.forId = forId;
        this.forNomeFantasia = forNomeFantasia;
        this.forCnpj = forCnpj;
        this.forRazaoSocial = forRazaoSocial;
    }

    public Long getForId() {
        return forId;
    }

    public void setForId(Long forId) {
        this.forId = forId;
    }

    public String getForNomeFantasia() {
        return forNomeFantasia;
    }

    public void setForNomeFantasia(String forNomeFantasia) {
        this.forNomeFantasia = forNomeFantasia;
    }

    public String getForCnpj() {
        return forCnpj;
    }

    public void setForCnpj(String forCnpj) {
        this.forCnpj = forCnpj;
    }

    public String getForRazaoSocial() {
        return forRazaoSocial;
    }

    public void setForRazaoSocial(String forRazaoSocial) {
        this.forRazaoSocial = forRazaoSocial;
    }

    public List<Endereco> getEnderecos() {
        return enderecos;
    }

    public void setEnderecos(List<Endereco> enderecos) {
        this.enderecos = enderecos;
    }

    public List<Contato> getContatos() {
        return contatos;
    }

    public void setContatos(List<Contato> contatos) {
        this.contatos = contatos;
    }

    public List<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Produto> produtos) {
        this.produtos = produtos;
    }
}
