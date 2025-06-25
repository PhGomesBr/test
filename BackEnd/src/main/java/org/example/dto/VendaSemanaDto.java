package org.example.dto;

import java.math.BigDecimal;

public class VendaSemanaDto {
    private Integer ano;
    private Integer semana;
    private BigDecimal totalVendas;

    public VendaSemanaDto(Integer ano, Integer semana, BigDecimal totalVendas) {
        this.ano = ano;
        this.semana = semana;
        this.totalVendas = totalVendas;
    }

    // getters e setters
    public Integer getAno() { return ano; }
    public void setAno(Integer ano) { this.ano = ano; }

    public Integer getSemana() { return semana; }
    public void setSemana(Integer semana) { this.semana = semana; }

    public BigDecimal getTotalVendas() { return totalVendas; }
    public void setTotalVendas(BigDecimal totalVendas) { this.totalVendas = totalVendas; }
}
