package org.example.services;

import org.example.dto.VendaDto;
import org.example.dto.VendaItemDto;
import org.example.dto.VendaSemanaDto;
import org.example.entities.*;
import org.example.repositories.*;
import org.example.resources.ProdutoResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @Autowired
    private ProdutoService produtoService;

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
        Cliente cliente = clienteRepository.findById(dto.getCliId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        FormaPagamento formaPagamento = formaPagamentoRepository.findById(dto.getFpgId())
                .orElseThrow(() -> new RuntimeException("Forma de pagamento não encontrada"));

        Venda venda = new Venda();
        venda.setCliente(cliente);
        venda.setFormaPagamento(formaPagamento);
        venda.setVenData(dto.getVenData());
        venda.setValorTotal(dto.getValorTotal());
        venda.setVendaCodigo(dto.getVendaCodigo());

        venda = vendaRepository.save(venda);

        List<VendaItem> itens = new ArrayList<>();
        for (VendaItemDto itemDto : dto.getItens()) {
            Produto produto = produtoRepository.findById(itemDto.getProId())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            produtoService.reduzirEstoque(produto.getProId(), itemDto.getQuantidade());

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

    // Novo método para listar todas as vendas já com cliente embutido
    public List<Venda> listarTodasVendas() {
        // Assuming vendaRepository.findAll() já traz os objetos cliente porque está com @ManyToOne(fetch=FetchType.EAGER)
        return vendaRepository.findAll();
    }

    public Venda findById(Long id) {
        Optional<Venda> vendaOpt = vendaRepository.findById(id);
        return vendaOpt.orElse(null);
    }

    public VendaDto converterParaDto(Venda venda) {
        VendaDto dto = new VendaDto();
        dto.setVenId(venda.getVenId());
        dto.setVenData(venda.getVenData());
        dto.setCliId(venda.getCliente().getCliId());
        dto.setFpgId(venda.getFormaPagamento().getFpgId());
        dto.setValorTotal(venda.getValorTotal());
        dto.setVendaCodigo(venda.getVendaCodigo());

        // Converter os itens de venda para DTO
        List<VendaItemDto> itensDto = venda.getItens().stream().map(item -> {
            VendaItemDto itemDto = new VendaItemDto();
            itemDto.setProId(item.getProduto().getProId());
            itemDto.setQuantidade(item.getQuantidade());
            itemDto.setPrecoUnitario(item.getPrecoUnitario());
            return itemDto;
        }).collect(Collectors.toList());

        dto.setItens(itensDto);
        return dto;
    }

    //metodo do lucro total
    public Double getLucroTotal() {
        Double lucro = vendaRepository.findLucroTotal();
        return lucro != null ? lucro : 0.0;
    }


}
