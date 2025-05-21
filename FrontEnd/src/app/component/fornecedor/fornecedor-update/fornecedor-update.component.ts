import { Component } from '@angular/core';
import { Fornecedor } from '../fornecedor.model';
import { FornecedorService } from '../fornecedor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fornecedor-update',
  templateUrl: './fornecedor-update.component.html',
  styleUrls: ['./fornecedor-update.component.css']
})
export class FornecedorUpdateComponent {
  fornecedor!: Fornecedor;

  constructor(private fornecedorService: FornecedorService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const forId = this.route.snapshot.paramMap.get('forId')
    this.fornecedorService.readById(forId!).subscribe((fornecedor: Fornecedor) =>{
      this.fornecedor = fornecedor
    })
  }

  updateFornecedor(): void {
    this.fornecedorService.update(this.fornecedor).subscribe(() => {
      this.fornecedorService.showMessage('Fornecedor atualizado com sucesso!')
      this.router.navigate(['/fornecedor'])
    })
  }

  cancel(): void {
    this.router.navigate(['/fornecedor'])
  }
}
