import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../product/product.service';
import { Router } from '@angular/router';
import { Product } from '../product/product.model';

@Component({
  selector: 'app-estoque-baixo',
  templateUrl: './estoque-baixo.component.html',
  styleUrls: ['./estoque-baixo.component.css']
})
export class EstoqueBaixoComponent implements OnInit {
  produtos: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);
  // Valor padrão do seletor de limite de estoque
  limite: number = 5;
  //colunas para aparecer na tabela
  displayedColumns: string[] = [
    'proId',
    'proNome',
    'proQuantidadeEstoque',
    'proCategoria',
    'proMarca',
    'fornecedor',
    'actions'
  ];
  // ViewChild pega a referência do MatSort (ordenação nas colunas da tabela)
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.carregarProdutosEstoqueBaixo();
  }

  carregarProdutosEstoqueBaixo(): void {
    this.productService.getProdutosEstoqueBaixo(this.limite).subscribe({
      next: (produtos) => {
        // Inicializa o MatTableDataSource com os produtos retornados
        this.produtos = new MatTableDataSource(produtos);
        // Associa o MatSort ao MatTableDataSource para permitir ordenação
        this.produtos.sort = this.sort;
        // Define a coluna 'proQuantidadeEstoque' como a coluna ativa para ordenação inicial
        this.produtos.sort.active = 'proQuantidadeEstoque';
        // Define a direção da ordenação como crescente ('asc' para ascending)
        this.produtos.sort.direction = 'asc';
        // Emite o evento de ordenação para aplicar a configuração inicial
        this.produtos.sort.sortChange.emit();
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