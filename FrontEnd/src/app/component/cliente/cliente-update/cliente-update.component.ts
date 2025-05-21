import { Component } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent {
  cliente!: Cliente;

  constructor(private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const cliId = this.route.snapshot.paramMap.get('cliId')
    this.clienteService.readById(cliId!).subscribe((cliente: Cliente) =>{
      this.cliente = cliente
    })
  }

  updateCliente(): void {
    this.clienteService.update(this.cliente).subscribe(() => {
      this.clienteService.showMessage('Produto atualizado com sucesso!')
      this.router.navigate(['/clientes'])
    })
  }

  cancel(): void {
    this.router.navigate(['/clientes'])
  }
}
