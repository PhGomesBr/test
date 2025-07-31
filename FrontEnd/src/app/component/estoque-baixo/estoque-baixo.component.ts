import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
import { Router } from '@angular/router';
import { Product } from '../product/product.model';

@Component({
  selector: 'app-estoque-baixo',
  templateUrl: './estoque-baixo.component.html',
  styleUrls: ['./estoque-baixo.component.css']
})
export class EstoqueBaixoComponent implements OnInit {
  produtos: Product[] = [];
  limite: number = 10; // Propriedade para o limite de estoque baixo
  displayedColumns: string[] = [
    'proId',
    'proNome',
    'proQuantidadeEstoque',
    'proCategoria',
    'proMarca',
    'fornecedor',
    'actions'
  ];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.carregarProdutosEstoqueBaixo();
  }

  carregarProdutosEstoqueBaixo(): void {
    this.productService.getProdutosEstoqueBaixo(this.limite).subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos com estoque baixo:', err);
        this.productService.showMessage('Erro ao carregar produtos com estoque baixo');
      }
    });
  }

  navigateToProductUpdate(id: number): void {
    this.router.navigate([`/products/update/${id}`]);
  }
}