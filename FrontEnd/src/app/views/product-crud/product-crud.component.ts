import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/component/product/product.model";
import { ProductService } from "src/app/component/product/product.service";
@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {
  searchTerm: string = '';
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  mostrarEstoqueBaixo: boolean = false;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    if (this.mostrarEstoqueBaixo) {
      this.productService.getProdutosEstoqueBaixo(5).subscribe({
        next: (produtos) => {
          this.allProducts = produtos;
          this.filteredProducts = produtos;
        },
        error: (err) => {
          console.error('Erro ao carregar estoque baixo:', err);
          this.productService.showMessage('Erro ao carregar estoque baixo');
        }
      });
    } else {
      this.productService.read().subscribe({
        next: (produtos) => {
          this.allProducts = produtos;
          this.filteredProducts = produtos;
        },
        error: (err) => {
          console.error('Erro ao carregar produtos:', err);
          this.productService.showMessage('Erro ao carregar produtos');
        }
      });
    }
  }

  toggleEstoqueBaixo(): void {
    this.mostrarEstoqueBaixo = !this.mostrarEstoqueBaixo;
    this.carregarProdutos();
  }

  filterProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.allProducts.filter(p =>
      (p.proNome.toLowerCase().includes(term)) ||
      (p.proPrecoCusto !== null && p.proPrecoCusto.toString().includes(term)) ||
      (p.proPrecoVenda !== null && p.proPrecoVenda.toString().includes(term))
    );
  }

  navigateToProductCreate(): void {
    this.router.navigate(['/products/create']);
  }
}