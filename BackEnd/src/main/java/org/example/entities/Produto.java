package org.example.entities;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Produto implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRO_ID")
    private Long proId;

    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 100, message = "Nome inválido, máximo 100 caracterias")
    @Column(name = "PRO_NOME", nullable = false, length = 100)
    private String proNome;

    @NotBlank(message = "Descrição é obrigatório")
    @Size(max = 500, message = "Descrição inválido, máximo 100 caracterias")
    @Column(name = "PRO_DESCRICAO", length = 500, nullable = false)
    private String proDescricao;

    @NotBlank(message = "Preço de custo é obrigatório")
    @Size(message = "Inválido")
    @Column(name = "PRO_PRECO_CUSTO", precision = 10, scale = 2)
    private BigDecimal proPrecoCusto;

    @NotBlank(message = "Preço de venda é obrigatório")
    @Size(message = "Inválido")
    @Column(name = "PRO_PRECO_VENDA", precision = 10, scale = 2, nullable = false)
    private BigDecimal proPrecoVenda;

    @NotBlank(message = "Quantidade Estoque é obrigatório")
    @Size(message = "Inválido")
    @Column(name = "PRO_QUANTIDADE_ESTOQUE", nullable = false)
    private Integer proQuantidadeEstoque;

    @NotBlank(message = "Categoria é obrigatório")
    @Size(max = 50, message = "Categoria inválida, máximo de 50 caracterias")
    @Column(name = "PRO_CATEGORIA", nullable = false, length = 50)
    private String proCategoria;

    @NotBlank(message = "Código de barras é obrigatório")
    @Size(message = "Inválido")
    @Column(name = "PRO_CODIGO_BARRAS", nullable = false)
    private String proCodigoBarras;

    @NotBlank(message = "Marca é obrigatório")
    @Size(max = 100, message = "Marca inválido, deve ter no máximo 100 caracteres")
    @Column(name = "PRO_MARCA", nullable = false, length = 100)
    private String proMarca;

    @NotBlank(message = "Unidade de Medida é obrigatório")
    @Size(max = 20, message = "Inválido")
    @Column(name = "PRO_UNIDADE_MEDIDA", nullable = false,length = 20)
    private String proUnidadeMedida;

    @NotBlank(message = "obrigatório")
    @Size(message = "Inválido")
    @Column(name = "PRO_ATIVO", nullable = false)
    private String proAtivo;

    @NotBlank(message = "Data de cadastro é obrigatório")
    @Size(max = 10, message = "Data de cadastro inválido, deve ter no máximo 10 caracteres")
    @Column(name = "PRO_DATA_CADASTRO",nullable = false, length = 10)
    private LocalDateTime proDataCadastro;

    @NotBlank(message = "Data de atualização é obrigatório")
    @Size(max = 10, message = "Data de atualização iválido, deve ter no máximo 10 caracteres")
    @Column(name = "PRO_DATA_ATUALIZACAO", nullable = false, length = 10)
    private LocalDateTime proDataAtualizacao;

    public Produto() {
    }

    // Construtor com todos os atributos pode ser adicionado aqui se necessário
    public Produto(Long proId, String proNome, String proDescricao, BigDecimal proPrecoCusto, BigDecimal proPrecoVenda, Integer proQuantidadeEstoque, String proCategoria, String proCodigoBarras, String proMarca, String proUnidadeMedida, String proAtivo, LocalDateTime proDataCadastro, LocalDateTime proDataAtualizacao) {
        this.proId = proId;
        this.proNome = proNome;
        this.proDescricao = proDescricao;
        this.proPrecoCusto = proPrecoCusto;
        this.proPrecoVenda = proPrecoVenda;
        this.proQuantidadeEstoque = proQuantidadeEstoque;
        this.proCategoria = proCategoria;
        this.proCodigoBarras = proCodigoBarras;
        this.proMarca = proMarca;
        this.proUnidadeMedida = proUnidadeMedida;
        this.proAtivo = proAtivo;
        this.proDataCadastro = proDataCadastro;
        this.proDataAtualizacao = proDataAtualizacao;
    }
    // Getters e Setters

    public Long getProId() {
        return proId;
    }

    public void setProId(Long proId) {
        this.proId = proId;
    }

    public String getProNome() {
        return proNome;
    }

    public void setProNome(String proNome) {
        this.proNome = proNome;
    }

    public String getProDescricao() {
        return proDescricao;
    }

    public void setProDescricao(String proDescricao) {
        this.proDescricao = proDescricao;
    }

    public BigDecimal getProPrecoCusto() {
        return proPrecoCusto;
    }

    public void setProPrecoCusto(BigDecimal proPrecoCusto) {
        this.proPrecoCusto = proPrecoCusto;
    }

    public BigDecimal getProPrecoVenda() {
        return proPrecoVenda;
    }

    public void setProPrecoVenda(BigDecimal proPrecoVenda) {
        this.proPrecoVenda = proPrecoVenda;
    }

    public Integer getProQuantidadeEstoque() {
        return proQuantidadeEstoque;
    }

    public void setProQuantidadeEstoque(Integer proQuantidadeEstoque) {
        this.proQuantidadeEstoque = proQuantidadeEstoque;
    }

    public String getProCategoria() {
        return proCategoria;
    }

    public void setProCategoria(String proCategoria) {
        this.proCategoria = proCategoria;
    }

    public String getProCodigoBarras() {
        return proCodigoBarras;
    }

    public void setProCodigoBarras(String proCodigoBarras) {
        this.proCodigoBarras = proCodigoBarras;
    }

    public String getProMarca() {
        return proMarca;
    }

    public void setProMarca(String proMarca) {
        this.proMarca = proMarca;
    }

    public String getProUnidadeMedida() {
        return proUnidadeMedida;
    }

    public void setProUnidadeMedida(String proUnidadeMedida) {
        this.proUnidadeMedida = proUnidadeMedida;
    }

    public String getProAtivo() {
        return proAtivo;
    }

    public void setProAtivo(String proAtivo) {
        this.proAtivo = proAtivo;
    }

    public LocalDateTime getProDataCadastro() {
        return proDataCadastro;
    }

    public void setProDataCadastro(LocalDateTime proDataCadastro) {
        this.proDataCadastro = proDataCadastro;
    }

    public LocalDateTime getProDataAtualizacao() {
        return proDataAtualizacao;
    }

    public void setProDataAtualizacao(LocalDateTime proDataAtualizacao) {
        this.proDataAtualizacao = proDataAtualizacao;
    }
}
