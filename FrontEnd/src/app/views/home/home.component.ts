import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/component/product/product.service';
import { VendaService } from 'src/app/component/venda/venda.service';

@Component({
  selector: 'app-home', // Define o seletor do componente
  templateUrl: './home.component.html', // Caminho para o template HTML
  styleUrls: ['./home.component.css'] // Caminho para o arquivo de estilos CSS
})
export class HomeComponent implements OnInit {
  constructor(public productService: ProductService,
    public vendaService: VendaService) { }
  productCount: number = 0;
  vendaCount: number = 0;
  estoqueBaixo: number = 0;

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.productCount = products.length;
    });

  this.productService.getContagemEstoqueBaixo().subscribe({
      next: (count) => {
        this.estoqueBaixo = count;
      },
      error: (err) => {
        console.error('Erro ao buscar contagem de estoque baixo:', err);
        this.productService.showMessage('Erro ao carregar contagem de estoque baixo');
      }
    });

    this.vendaService.read().subscribe(vendas => {
      this.vendaCount = vendas.length;
    });
  }
}