import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Venda } from '../../component/venda/venda.model';
import { VendaService } from '../../component/venda/venda.service';

@Component({
  selector: 'app-venda-crud',
  templateUrl: './venda-crud.component.html',
  styleUrls: ['./venda-crud.component.css']
})
export class VendaCrudComponent implements OnInit {
  vendas: Venda[] = [];
  filteredVendas: Venda[] = [];
  searchTerm: string = '';

  constructor(private vendaService: VendaService, private router: Router) {}

  ngOnInit(): void {
    this.vendaService.read().subscribe(data => {
      this.vendas = data;
      this.filteredVendas = data;
    });
  }

  navigateToVendaCreate(): void {
    this.router.navigate(['/venda/create']);
  }

  filterVendas(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredVendas = this.vendas.filter(v =>
      v.vendaCodigo.toLowerCase().includes(term)
    );
  }
}
