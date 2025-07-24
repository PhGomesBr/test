import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Venda } from 'src/app/component/venda/venda.model';
import { VendaService } from 'src/app/component/venda/venda.service';

@Component({
  selector: 'app-venda-crud',
  templateUrl: './venda-crud.component.html',
  styleUrls: ['./venda-crud.component.css']
})
export class VendaCrudComponent implements OnInit {
  searchTerm: string = '';
  allVenda: Venda[] = [];
    // Construtor para injetar o serviço de roteamento
    constructor(
       private router: Router,
       private vendaService: VendaService) { }

    // Método chamado ao inicializar o componente
    ngOnInit(): void {
      this.vendaService.read().subscribe((venda: Venda[]) => {
        this.allVenda = venda;
      });
    }

    // Método para navegar para a tela de criação de contatoes
    navigateToVendaCreate(): void {
      this.router.navigate(['/venda/create']);
    }
}
