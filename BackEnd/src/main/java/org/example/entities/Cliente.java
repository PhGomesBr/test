package org.example.entities;

import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
public class Cliente implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CLI_ID")
    private Long cliId;

    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
    @Column(name = "CLI_NOME", nullable = false, length = 100)
    private String cliNome;

    @NotBlank(message = "CPF é obrigatório")
    @CPF(message = "CPF inválido")
    @Column(name = "CLI_CPF", length = 11, nullable = false)
    private String cliCpf;

    @NotBlank(message = "E-mail é obrigatório")
    @Size(max = 150, message = "E-mail deve ter no máximo 150 caracteres")
    @Column(name = "CLI_EMAIL",  nullable = false, length = 150)
    private String cliEmail;

    @NotBlank(message = "Telefone é obrigatório")
    @Size(max = 14, message = "Telefone inválido")
    @Column(name = "CLI_TELEFONE", length = 14, nullable = false)
    private String cliTelefone;

    public Cliente() {
    }

    public Cliente(Long cliId, String cliNome, String cliCpf, String cliEmail, String cliTelefone) {
        this.cliId = cliId;
        this.cliNome = cliNome;
        this.cliCpf = cliCpf;
        this.cliEmail = cliEmail;
        this.cliTelefone = cliTelefone;
    }

    public Long getCliId() {
        return cliId;
    }

    public void setCliId(Long cliId) {
        this.cliId = cliId;
    }

    public String getCliNome() {
        return cliNome;
    }

    public void setCliNome(String cliNome) {
        this.cliNome = cliNome;
    }

    public String getCliCpf() {
        return cliCpf;
    }

    public void setCliCpf(String cliCpf) {
        this.cliCpf = cliCpf;
    }

    public String getCliEmail() {
        return cliEmail;
    }

    public void setCliEmail(String cliEmail) {
        this.cliEmail = cliEmail;
    }

    public String getCliTelefone() {
        return cliTelefone;
    }

    public void setCliTelefone(String cliTelefone) {
        this.cliTelefone = cliTelefone;
    }

    //novo
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
}
