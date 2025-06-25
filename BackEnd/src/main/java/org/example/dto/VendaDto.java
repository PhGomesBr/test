package org.example.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class VendaDto {

    private Long clienteId;
    private Long formaPagamentoId;
    private LocalDateTime venData;
    private BigDecimal valorTotal;
    private List<VendaItemDto> itens;

    public VendaDto() {
    }

    // Getters e setters
    public Long getClienteId() { return clienteId; }
    public void setClienteId(Long clienteId) { this.clienteId = clienteId; }

    public Long getFormaPagamentoId() { return formaPagamentoId; }
    public void setFormaPagamentoId(Long formaPagamentoId) { this.formaPagamentoId = formaPagamentoId; }

    public LocalDateTime getVenData() { return venData; }
    public void setVenData(LocalDateTime venData) { this.venData = venData; }

    public BigDecimal getValorTotal() { return valorTotal; }
    public void setValorTotal(BigDecimal valorTotal) { this.valorTotal = valorTotal; }

    public List<VendaItemDto> getItens() { return itens; }
    public void setItens(List<VendaItemDto> itens) { this.itens = itens; }
}
