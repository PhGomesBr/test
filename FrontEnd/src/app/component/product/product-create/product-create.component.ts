import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { FornecedorService } from '../../fornecedor/fornecedor.service'; // Corrigir o caminho conforme seu projeto
import { Fornecedor } from '../../fornecedor/fornecedor.model'; // Opcional: se você tiver um modelo de Fornecedor

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  fornecedores: Fornecedor[] = [];

  product: Product = {
    proNome: '',
    proDescricao: '',
    proPrecoCusto: null,
    proPrecoVenda: null,
    proQuantidadeEstoque: null,
    proCategoria: '',
    proCodigoBarras: this.generateCodigoBarra(),
    proMarca: '',
    proUnidadeMedida: '',
    proAtivo: true,
    proDataCadastro: new Date().toISOString(),
    proDataAtualizacao: new Date().toISOString(),
    fornecedor: {
      forId: 0,
    }
  };


  constructor(
    private productService: ProductService,
    private fornecedorService: FornecedorService,
    private router: Router
  ) {}

  generateCodigoBarra(): string {
    const codigo = Math.floor(Math.random() * 1000000);
    return codigo.toString().padStart(13, '2009');
  }
  

  ngOnInit(): void {
    this.fornecedorService.readFornecedores().subscribe((data: Fornecedor[]) => {
      this.fornecedores = data;
    });
  }

  view = false;

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado!');
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
