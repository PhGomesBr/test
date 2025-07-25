package org.example.resources;

import org.example.dto.VendaDto;
import org.example.dto.VendaSemanaDto;
import org.example.entities.Venda;
import org.example.services.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/vendas")
public class VendaResource {

    @Autowired
    private VendaService vendaService;

    @PostMapping
    public ResponseEntity<Venda> criarVenda(@RequestBody VendaDto dto) {
        Venda vendaSalva = vendaService.salvarVenda(dto);
        return ResponseEntity.status(201).body(vendaSalva);
    }

    @GetMapping("/vendas-semanais")
    public ResponseEntity<List<VendaSemanaDto>> listarVendasSemana() {
        List<VendaSemanaDto> vendas = vendaService.obterVendasPorSemana();
        return ResponseEntity.ok(vendas);
    }

    @GetMapping
    public ResponseEntity<List<Venda>> listarTodasVendas() {
        List<Venda> vendas = vendaService.listarTodasVendas();
        return ResponseEntity.ok(vendas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venda> listarVendaPorId(@PathVariable Long id) {
        Venda venda = vendaService.findById(id);
        return venda != null ? ResponseEntity.ok(venda) : ResponseEntity.notFound().build();
    }
}
