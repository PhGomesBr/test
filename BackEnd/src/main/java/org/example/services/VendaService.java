package org.example.services;

import org.example.dto.ProdutoVendidoSemanaDto;
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
import java.util.*;
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
    public Map<String, Object> obterDadosGraficoProdutosMaisVendidos() {
        // Chama a query do repositório
        List<ProdutoVendidoSemanaDto> produtosVendidos = obterQuantidadeVendidaPorProdutoPorSemana();

        // Cria labels únicos (ex.: "Semana 1/2025")
        Set<String> labelsSet = produtosVendidos.stream()
                .map(dto -> "Semana " + dto.getSemana() + "/" + dto.getAno())
                .collect(Collectors.toCollection(TreeSet::new));
        List<String> labels = new ArrayList<>(labelsSet);

        // Agrupa dados por produto para criar datasets
        Map<String, List<Long>> datasetsMap = new HashMap<>();
        for (ProdutoVendidoSemanaDto dto : produtosVendidos) {
            String produto = dto.getProNome();
            datasetsMap.computeIfAbsent(produto, k -> new ArrayList<>(Collections.nCopies(labels.size(), 0L)));
            int index = labels.indexOf("Semana " + dto.getSemana() + "/" + dto.getAno());
            datasetsMap.get(produto).set(index, dto.getTotalQuantidade());
        }

        // Monta datasets com cores para as linhas
        List<Map<String, Object>> datasets = new ArrayList<>();
        List<String> colors = Arrays.asList(
                "rgba(75, 192, 192, 0.5)", "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)"
        );
        int colorIndex = 0;

        for (Map.Entry<String, List<Long>> entry : datasetsMap.entrySet()) {
            Map<String, Object> dataset = new HashMap<>();
            dataset.put("label", entry.getKey()); // Nome do produto
            dataset.put("data", entry.getValue()); // Quantidades por semana
            dataset.put("borderColor", colors.get(colorIndex % colors.size())); // Cor da linha
            dataset.put("fill", false); // Não preenche a área sob a linha
            datasets.add(dataset);
            colorIndex++;
        }

        // Estrutura final para o Chart.js
        Map<String, Object> chartData = new HashMap<>();
        chartData.put("labels", labels);
        chartData.put("datasets", datasets);
        return chartData;
    }

    private List<ProdutoVendidoSemanaDto> obterQuantidadeVendidaPorProdutoPorSemana() {
        List<Object[]> resultados = vendaItemRepository.findQuantidadeVendidaPorProdutoPorSemana();
        List<ProdutoVendidoSemanaDto> listaDTO = new ArrayList<>();
        for (Object[] linha : resultados) {
            Long proId = ((Number) linha[0]).longValue();
            String proNome = (String) linha[1];
            Integer ano = (Integer) linha[2];
            Integer semana = (Integer) linha[3];
            Long totalQuantidade = ((Number) linha[4]).longValue();
            listaDTO.add(new ProdutoVendidoSemanaDto(proId, proNome, ano, semana, totalQuantidade));
        }
        return listaDTO;
    }

}
