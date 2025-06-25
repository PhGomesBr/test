package org.example.services;

import org.example.dto.VendaDto;
import org.example.dto.VendaItemDto;
import org.example.dto.VendaSemanaDto;
import org.example.entities.*;
import org.example.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private VendaItemRepository vendaItemRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private FormaPagamentoRepository formaPagamentoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public List<VendaSemanaDto> obterVendasPorSemana() {
        List<Object[]> resultados = vendaRepository.findTotalVendasPorSemana();
        List<VendaSemanaDto> listaDTO = new ArrayList<>();

        for (Object[] linha : resultados) {
            Integer ano = (Integer) linha[0];
            Integer semana = (Integer) linha[1];
            BigDecimal total = (BigDecimal) linha[2];
            listaDTO.add(new VendaSemanaDto(ano, semana, total));
        }
        return listaDTO;
    }

    @Transactional
    public Venda salvarVenda(VendaDto dto) {

        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        FormaPagamento formaPagamento = formaPagamentoRepository.findById(dto.getFormaPagamentoId())
                .orElseThrow(() -> new RuntimeException("Forma de pagamento não encontrada"));

        Venda venda = new Venda();
        venda.setCliente(cliente);
        venda.setFormaPagamento(formaPagamento);
        venda.setVenData(dto.getVenData());
        venda.setValorTotal(dto.getValorTotal());

        venda = vendaRepository.save(venda);

        List<VendaItem> itens = new ArrayList<>();

        for (VendaItemDto itemDto : dto.getItens()) {
            Produto produto = produtoRepository.findById(itemDto.getProdutoId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            VendaItem item = new VendaItem();
            item.setVenda(venda);
            item.setProduto(produto);
            item.setQuantidade(itemDto.getQuantidade());
            item.setPrecoUnitario(itemDto.getPrecoUnitario());

            itens.add(item);
        }

        vendaItemRepository.saveAll(itens);
        venda.setItens(itens);

        return venda;
    }
}
