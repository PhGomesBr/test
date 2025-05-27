// Importações necessárias para o componente
import { Component, Input } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service'; 

// Decorador que define o componente Angular
@Component({
  selector: 'app-cliente-read', // Nome do seletor usado no HTML
  templateUrl: './cliente-read.component.html', // Caminho para o template HTML do componente
  styleUrls: ['./cliente-read.component.css'] // Caminho para o arquivo de estilos CSS do componente
})
export class ClienteReadComponent {
  @Input() // Termo de pesquisa para filtrar clientees
  cliente!: Cliente[]; // Lista de clientees
  displayedColumns = ['cliId', 'cliNome', 'cliCpf', 'cliEmail', 'cliTelefone', 'action'];

  // Injeta o serviço ClienteService no construtor
  constructor(private clienteService: ClienteService) {}

  // Método executado ao inicializar o componente
  ngOnInit(): void {
    this.clienteService.read().subscribe(cliente => {
      this.cliente = cliente; // Atribui os dados recebidos à lista de clientees
      console.log(cliente); // Exibe os dados no console para depuração
    });
  }
}