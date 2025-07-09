import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/component/cliente/cliente.model';
import { ClienteContatoService } from 'src/app/component/cliente/cliente.service';

@Component({
  selector: 'app-cliente-crud',
  templateUrl: './cliente-crud.component.html',
  styleUrls: ['./cliente-crud.component.css']
})
export class ClienteCrudComponent implements OnInit {
  searchTerm: string = '';
  allCliente: Cliente[] = [];
  filteredCliente: Cliente[] = [];

  constructor(
    private router: Router,
    private clienteService: ClienteContatoService
  ) {}

ngOnInit(): void {
  this.clienteService.readClientes().subscribe((clientes: Cliente[]) => {
    this.allCliente = clientes;
    this.filteredCliente = clientes;
  });
}


  navigateToClienteCreate(): void {
    this.router.navigate(['/cliente/create']);
  }

  filterCliente(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCliente = this.allCliente.filter(cliente =>
      cliente.cliNome.toLowerCase().includes(term) ||
      cliente.cliCpf.toLowerCase().includes(term)
    );
  }
}
