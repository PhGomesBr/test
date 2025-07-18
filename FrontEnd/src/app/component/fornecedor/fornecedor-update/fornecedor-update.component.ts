import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../fornecedor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-update',
  templateUrl: './fornecedor-update.component.html',
  styleUrls: ['./fornecedor-update.component.css']
})
export class FornecedorUpdateComponent implements OnInit {
  fornecedor!: Fornecedor;
  
  constructor(
    private fornecedorService: FornecedorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const forId = this.route.snapshot.paramMap.get('forId');
    if (forId) {
      this.fornecedorService.readFornecedorById(forId).subscribe((fornecedor: Fornecedor) => {
        this.fornecedor = fornecedor;
      });
    } else {
      // Caso o forId seja null, pode redirecionar ou mostrar erro
      this.router.navigate(['/fornecedor']);
    }
  }

  updateFornecedor(): void {
    this.fornecedorService.updateFornecedor(this.fornecedor).subscribe(() => {
      this.fornecedorService.showMessage('Fornecedor atualizado com sucesso!');
      this.router.navigate(['/fornecedor']);
    });
  }

  cancel(): void {
    this.router.navigate(['/fornecedor']);
  }
}
