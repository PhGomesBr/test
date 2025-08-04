import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/component/product/product.service';
import { VendaService } from 'src/app/component/venda/venda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productCount: number = 0;
  vendaCount: number = 0;
  estoqueBaixo: number = 0;

  totalLucro: number = 0;

  constructor(
    public productService: ProductService,
    public vendaService: VendaService
  ) {}

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.productCount = products.length;
    });

    this.productService.getContagemEstoqueBaixo().subscribe({
      next: (count) => this.estoqueBaixo = count,
      error: (err) => {
        console.error('Erro ao buscar contagem de estoque baixo:', err);
        this.productService.showMessage('Erro ao carregar contagem de estoque baixo');
      }
    });

    this.vendaService.read().subscribe(vendas => {
      this.vendaCount = vendas.length;
    });

    // Aqui: chama o endpoint para obter o lucro total das vendas
    this.vendaService.getLucroTotal().subscribe({
      next: (lucro) => {
        this.totalLucro = lucro;
      },
      error: (err) => {
        console.error('Erro ao carregar lucro total:', err);
      }
    });
  }
}
