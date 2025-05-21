// Importações necessárias para o componente
import { Component } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service'; 

// Decorador que define o componente Angular
@Component({
  selector: 'app-cliente-read', // Nome do seletor usado no HTML
  templateUrl: './cliente-read.component.html', // Caminho para o template HTML do componente
  styleUrls: ['./cliente-read.component.css'] // Caminho para o arquivo de estilos CSS do componente
})
export class ClienteReadComponent {
  // Array que armazena os dados dos clientes
  clientes!: Cliente[];

  // Colunas exibidas na tabela
  displayedColumns = ['cliId', 'cliNome', 'cliCpf', 'cliEmail', 'cliTelefone', 'action'];

  // Construtor que injeta o serviço ClienteService
  constructor(private clienteService: ClienteService) { }

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
    // Chama o método 'read' do serviço para buscar os dados dos clientes
    this.clienteService.read().subscribe(clientes => {
      this.clientes = clientes; // Armazena os dados retornados no array 'cliente'
      console.log(clientes); // Exibe os dados no console para depuração
    });
  }
}