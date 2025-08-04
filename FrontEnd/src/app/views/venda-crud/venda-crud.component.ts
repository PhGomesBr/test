import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/component/template/header/header.service';
import { Venda } from 'src/app/component/venda/venda.model';
import { VendaService } from 'src/app/component/venda/venda.service';

@Component({
  selector: 'app-venda-crud',
  templateUrl: './venda-crud.component.html',
  styleUrls: ['./venda-crud.component.css']
})
export class VendaCrudComponent implements OnInit {

  allVenda: Venda[] = [];
  searchTerm: string = '';
  vendaFilter: Venda[] = [];

  constructor(
    private headerService: HeaderService,
    private router: Router,
    private vendaService: VendaService
  ) { }

  navigateToVendaCreate(): void {
    this.router.navigate(['venda/create']);
  }

  ngOnInit(): void {
    this.headerService.setTitulo('Vendas');
    this.headerService.setIcone('sell');
    this.vendaService.read().subscribe((venda: Venda[]) => {
      this.allVenda = venda;
    })
  }

  filterVendas(): void {
    const filter = this.searchTerm.toLocaleLowerCase();
    this.vendaFilter = this.allVenda.filter(f =>
      f.cliId?.toString().includes(filter) ||
      f.vendaCodigo.toString().includes(filter)
    );
  }
}