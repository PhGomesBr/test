import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteContatoService } from '../cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
  cliente!: Cliente;
  
  constructor(
    private clienteService: ClienteContatoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const cliId = this.route.snapshot.paramMap.get('cliId');
    if (cliId) {
      this.clienteService.readClienteById(cliId).subscribe((cliente: Cliente) => {
        this.cliente = cliente;
      });
    } else {
      // Caso o cliId seja null, pode redirecionar ou mostrar erro
      this.router.navigate(['/clientes']);
    }
  }

  updateCliente(): void {
    this.clienteService.updateCliente(this.cliente).subscribe(() => {
      this.clienteService.showMessage('Cliente atualizado com sucesso!');
      this.router.navigate(['/clientes']);
    });
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }
}
