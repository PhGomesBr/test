package org.example.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.validator.constraints.br.CNPJ;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Fornecedor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FOR_ID")
    private Long forId;

    // Relacionamento com Produto
    @OneToMany(mappedBy = "fornecedor", cascade = CascadeType.ALL)
    @JsonManagedReference  // controla o lado "pai" da relação
    private List<Produto> produtos = new ArrayList<>();

    // Relacionamento com Endereço
    @OneToMany(mappedBy = "endFornecedor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Endereco> enderecos = new ArrayList<>();

    // Relacionamento com Contato
    @OneToMany(mappedBy = "conFornecedor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contato> contatos = new ArrayList<>();

    // Campos obrigatórios com validação
    @NotBlank(message = "Nome da Fantasia é obrigatório!")
    @Size(max = 100, message = "Nome da Fantasia deve ter no máximo 100 caracteres!")
    @Column(name = "FOR_NOME_FANTASIA", length = 100, nullable = false)
    private String forNomeFantasia;

    @NotBlank(message = "CNPJ obrigatório")
    @CNPJ(message = "CNPJ inválido, por favor insira um válido!")
    @Column(name = "FOR_CNPJ", length = 20, nullable = false, unique = true)
    private String forCnpj;

    @NotBlank(message = "Razão Social é obrigatória!")
    @Size(max = 100, message = "Razão Social deve ter no máximo 100 caracteres!")
    @Column(name = "FOR_RAZAO_SOCIAL", length = 100, nullable = false)
    private String forRazaoSocial;

    // Construtores
    public Fornecedor() {}

    public Fornecedor(String forNomeFantasia, String forCnpj, String forRazaoSocial) {
        this.forNomeFantasia = forNomeFantasia;
        this.setForCnpj(forCnpj); // Sanitiza CNPJ
        this.forRazaoSocial = forRazaoSocial;
    }

    // Getters e Setters

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
        if (forCnpj != null) {
            this.forCnpj = forCnpj.replaceAll("\\D", ""); // Remove caracteres não numéricos
        } else {
            this.forCnpj = null;
        }
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
