package org.example.dto;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class VendaDto {

    private Long venId;
    @NotBlank
    private String vendaCodigo;

    private LocalDateTime venData;

    @NotNull
    private Long cliId;

    @NotNull
    private Long fpgId;

    @NotNull
    @Digits(integer = 10, fraction = 2)
    private BigDecimal valorTotal;

    @NotEmpty
    private List<VendaItemDto> itens;

    public VendaDto() {
    }

    public Long getVenId() {
        return venId;
    }

    public void setVenId(Long venId) {
        this.venId = venId;
    }

    public String getVendaCodigo() {
        return vendaCodigo;
    }

    public void setVendaCodigo(String vendaCodigo) {
        this.vendaCodigo = vendaCodigo;
    }

    public LocalDateTime getVenData() {
        return venData;
    }

    public void setVenData(LocalDateTime venData) {
        this.venData = venData;
    }

    public Long getCliId() {
        return cliId;
    }

    public void setCliId(Long cliId) {
        this.cliId = cliId;
    }

    public Long getFpgId() {
        return fpgId;
    }

    public void setFpgId(Long fpgId) {
        this.fpgId = fpgId;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public List<VendaItemDto> getItens() {
        return itens;
    }

    public void setItens(List<VendaItemDto> itens) {
        this.itens = itens;
    }
}
