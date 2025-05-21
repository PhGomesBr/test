// Importações necessárias para o componente
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente.model'; // Modelo de dados do cliente
import { Router } from '@angular/router'; // Para navegação entre rotas
import { ClienteService } from '../cliente.service'; // Serviço para manipulação de dados do cliente

// Decorador que define o componente Angular
@Component({
  selector: 'app-cliente-create', // Nome do seletor usado no HTML
  templateUrl: './cliente-create.component.html', // Caminho para o template HTML do componente
  styleUrls: ['./cliente-create.component.css'] // Caminho para o arquivo de estilos CSS do componente
})
export class ClienteCreateComponent implements OnInit {
  // Objeto cliente inicializado com valores vazios
  cliente: Cliente = {
    cliNome: '', // Nome do cliente
    cliCpf: '', // CPF do cliente
    cliEmail: '', // E-mail do cliente
    cliTelefone: '', // Telefone do cliente
  };

  // Construtor que injeta o serviço ClienteService e o Router
  constructor(private clienteService: ClienteService,
              private router: Router) { }

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
    // Nenhuma lógica inicial necessária
  }

  // Método para criar um novo cliente
  createCliente(): void {
    this.clienteService.create(this.cliente).subscribe(() => {
      this.clienteService.showMessage('Cliente criado!'); // Exibe mensagem de sucesso
      this.router.navigate(['/clientes']); // Navega para a lista de clientes
    });
  }

  // Método para cancelar a operação e voltar para a lista de clientes
  cancel(): void {
    this.router.navigate(['/clientes']); // Navega para a lista de clientes
  }
}