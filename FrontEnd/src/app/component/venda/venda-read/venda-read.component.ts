import { Component, Input, OnInit } from '@angular/core';
import { Venda } from '../venda.model';
import { VendaService } from '../venda.service';

@Component({
  selector: 'app-venda-read',
  templateUrl: './venda-read.component.html',
  styleUrls: ['./venda-read.component.css']
})
export class VendaReadComponent implements OnInit {
  @Input() vendas: Venda[] = [];

  displayedColumns = ['venId', 'vendaCodigo', 'venData', 'cliId', 'valorTotal', 'fpgId'];
  constructor(private vendaService: VendaService) {}

  ngOnInit(): void {
    this.vendaService.read().subscribe(vendas => {
      this.vendas = vendas; // Atribui os dados recebidos à lista de produtos
      console.log(vendas); // Exibe os dados no console para depuração
    });
  }
}
