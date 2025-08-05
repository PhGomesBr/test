package org.example.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.example.entities.VendaItem;


@Entity
@Table(name = "venda")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ven_id")
    private Long venId;

    @Column(name = "ven_data", nullable = false)
    private LocalDateTime venData;

    @ManyToOne
    @JoinColumn(name = "cli_id", nullable = false)
    private Cliente cliente;

    @Column(name = "ven_codigo", nullable = false)
    private String vendaCodigo;
    @ManyToOne
    @JoinColumn(name = "fpg_id", nullable = false)
    private FormaPagamento formaPagamento;

    @Column(name = "ven_valor_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal valorTotal;

    @OneToMany(mappedBy = "venda", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Evita o ciclo infinito
    private List<VendaItem> itens;

    //construtor

    public Venda() {
    }

    public Venda(Long venId, LocalDateTime venData, Cliente cliente, FormaPagamento formaPagamento, BigDecimal valorTotal, List<VendaItem> itens, String vendaCodigo) {
        this.venId = venId;
        this.venData = venData;
        this.vendaCodigo = vendaCodigo;
        this.cliente = cliente;
        this.formaPagamento = formaPagamento;
        this.valorTotal = valorTotal;
        this.itens = itens;
    }
    // Getters e setters

    public Long getVenId() {
        return venId;
    }

    public void setVenId(Long venId) {
        this.venId = venId;
    }

    public LocalDateTime getVenData() {
        return venData;
    }

    public void setVenData(LocalDateTime venData) {
        this.venData = venData;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public FormaPagamento getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(FormaPagamento formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public List<VendaItem> getItens() {
        return itens;
    }

    public void setItens(List<VendaItem> itens) {
        this.itens = itens;
    }

    public String getVendaCodigo() {
        return vendaCodigo;
    }

    public void setVendaCodigo(String vendaCodigo) {
        this.vendaCodigo = vendaCodigo;
    }
}
