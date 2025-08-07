package org.example.dto;

public class ProdutoVendidoSemanaDto {
    private Long proId;
    private String proNome;
    private Integer ano;
    private Integer semana;
    private Long totalQuantidade;

    public ProdutoVendidoSemanaDto(Long proId, String proNome, Integer ano, Integer semana, Long totalQuantidade) {
        this.proId = proId;
        this.proNome = proNome;
        this.ano = ano;
        this.semana = semana;
        this.totalQuantidade = totalQuantidade;
    }

    // Getters e Setters
    public Long getProId() { return proId; }
    public void setProId(Long proId) { this.proId = proId; }
    public String getProNome() { return proNome; }
    public void setProNome(String proNome) { this.proNome = proNome; }
    public Integer getAno() { return ano; }
    public void setAno(Integer ano) { this.ano = ano; }
    public Integer getSemana() { return semana; }
    public void setSemana(Integer semana) { this.semana = semana; }
    public Long getTotalQuantidade() { return totalQuantidade; }
    public void setTotalQuantidade(Long totalQuantidade) { this.totalQuantidade = totalQuantidade; }
}