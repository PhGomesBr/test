package org.example.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.example.entities.Produto;
import org.example.entities.Venda;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "venda_item")
public class VendaItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vit_id")
    private Long vitId;


    
    @ManyToOne
    @JoinColumn(name = "ven_id", nullable = false)
    @JsonBackReference // Evita o ciclo infinito ao serializar
    private Venda venda;

    @ManyToOne
    @JoinColumn(name = "pro_id", nullable = false)
    private Produto produto;

    @Column(name = "vit_quantidade", nullable = false)
    private Integer quantidade;

    @Column(name = "vit_preco_unitario", precision = 10, scale = 2, nullable = false)
    private BigDecimal precoUnitario;

    // Construtores

    public VendaItem() {
    }

    public VendaItem(Long vitId, Venda venda, Produto produto, Integer quantidade, BigDecimal precoUnitario) {
        this.vitId = vitId;
        this.venda = venda;
        this.produto = produto;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }

    // Getters e Setters

    public Long getVitId() {
        return vitId;
    }

    public void setVitId(Long vitId) {
        this.vitId = vitId;
    }

    public Venda getVenda() {
        return venda;
    }

    public void setVenda(Venda venda) {
        this.venda = venda;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getPrecoUnitario() {
        return precoUnitario;
    }

    public void setPrecoUnitario(BigDecimal precoUnitario) {
        this.precoUnitario = precoUnitario;
    }
}
