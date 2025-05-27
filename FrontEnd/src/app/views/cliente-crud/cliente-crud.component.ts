import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/component/cliente/cliente.model';
import { ClienteService } from 'src/app/component/cliente/cliente.service';

@Component({
  selector: 'app-cliente-crud', // Define o seletor do componente
  templateUrl: './cliente-crud.component.html', // Caminho para o template HTML
  styleUrls: ['./cliente-crud.component.css'] // Caminho para o arquivo de estilos CSS
})
export class ClienteCrudComponent implements OnInit {
  searchTerm: string = '';
  allCliente: Cliente[] = [];
  filteredCliente: Cliente[] = [];
    // Construtor para injetar o serviço de roteamento
    constructor(
       private router: Router,
       private clienteService: ClienteService) { }

    // Método chamado ao inicializar o componente
    ngOnInit(): void {
      this.clienteService.read().subscribe((cliente: Cliente[]) => {
        this.allCliente = cliente;
        this.filteredCliente = cliente;
      });
    }

    // Método para navegar para a tela de criação de clientees
    navigateToClienteCreate(): void {
      this.router.navigate(['/cliente/create']);
    }
    // Método para filtrar a lista de clientees com base no termo de pesquisa
    filterCliente(): void {
      const term = this.searchTerm.toLowerCase();
      this.filteredCliente = this.allCliente.filter(f =>
        f.cliNome.toLowerCase().includes(term)
      );
    }
}