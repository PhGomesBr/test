import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../product/product.model';
import { ProductService } from '../../product/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VendaService } from '../venda.service';
import { Venda, VendaItem } from '../venda.model';

@Component({
  selector: 'app-venda-create',
  templateUrl: './venda-create.component.html',
  styleUrls: ['./venda-create.component.css']
})
export class VendaCreateComponent implements OnInit {

  vendaForm!: FormGroup;
  products: Product[] = [];

  constructor( private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router,
    private vendaService: VendaService) { }

    generateVendaCodigo(): string {
      const codigo = Math.floor(Math.random() * 1000000);
      return codigo.toString().padStart(6, '0');
    }

  ngOnInit(): void {
    this.vendaForm = this.fb.group({
      vendaCodigo: [this.generateVendaCodigo(), Validators.required],
      vendaData: [new Date(), Validators.required],
      cliId: [null, Validators.required],
      fpgId: [null, Validators.required],
      compras: this.fb.array([], Validators.required)
    });

    this.productService.read().subscribe({
      next: produtos => this.products = produtos,
      error:  err => this.snackBar.open('Erro ao carregar produtos', 'X', {duration: 3000})
    });

    this.addCompra(); // Adiciona uma compra inicial ao formulário
  }

  get vendaItem(){
    return this.vendaForm.get('compras') as FormArray;
  }

  createCompra(): FormGroup {
    return this.fb.group({
      proId: [null, Validators.required],
      compraQuantidade: [1, [Validators.required, Validators.min(1)]],
      compraPrecoVenda: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addCompra(): void {
    this.vendaItem.push(this.createCompra());
  }

  removeCompra(index: number): void {
    this.vendaItem.removeAt(index);
  }

  
  onProdutoChange(index: number): void {
    const compraGroup = this.vendaItem.at(index);
    const proId = compraGroup.get('proId')?.value;

    const produto = this.products.find(p => p.proId === proId);
    if(produto) {
      compraGroup.patchValue({
        compraPrecoVenda: produto.proPrecoVenda
      });
    } else {
      compraGroup.patchValue({
        compraPrecoVenda: 0
      });
    }
  }

  onSubmit(): void {
    const raw = this.vendaForm.value;
    
    const itens: VendaItem[] = raw.compras.map((item: any) => ({
      proId: item.proId,
      quantidade: item.compraQuantidade,
      precoUnitario: item.compraPrecoVenda
    }));
  
    const valorTotal = itens.reduce(
      (sum: number, item: VendaItem) => sum + item.quantidade * item.precoUnitario,
      0
    );
  
    const venda: Venda = {
      venData: new Date(raw.vendaData).toISOString(),
      vendaCodigo: raw.vendaCodigo,
      cliId: raw.cliId,
      fpgId: raw.fpgId,
      valorTotal: valorTotal,
      itens: itens
    };
  
    this.vendaService.create(venda).subscribe({
      next: () => {
        this.snackBar.open('Venda criada com sucesso!', 'X', { duration: 3000 });
        this.router.navigate(['/vendas']);
      },
      error: (err) => {
        this.snackBar.open('Erro ao criar venda', 'X', { duration: 3000 });
        console.error(err);
        console.log(venda);
      }
    });
  }
  
}
