import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente.model'; // Modelo de dados do cliente
import { Router } from '@angular/router'; // Para navegação entre rotas
import { ClienteContatoService } from '../cliente.service'; // Serviço para manipulação de dados do cliente

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {
  cliente: Cliente = {
    cliNome: '',
    cliCpf: '',
    conCelular: '',
    conTelefoneComercial: '',
    conEmail: '',
    endRua: '',
    endNumero: '',
    endCidade: '',
    endCep: '',
    endEstado: ''
  };

  constructor(
    private clienteService: ClienteContatoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Nenhuma lógica necessária aqui
  }

  createCliente(): void {
    this.clienteService.createCliente(this.cliente).subscribe(() => {
      this.clienteService.showMessage('Cliente criado!');
      this.router.navigate(['/clientes']);
    });
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }
}