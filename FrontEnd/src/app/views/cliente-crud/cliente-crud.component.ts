import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-crud', // Define o seletor do componente
  templateUrl: './cliente-crud.component.html', // Caminho para o template HTML
  styleUrls: ['./cliente-crud.component.css'] // Caminho para o arquivo de estilos CSS
})
export class ClienteCrudComponent implements OnInit {
  // Construtor para injetar o serviço de roteamento
  constructor(private router: Router) { }

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
  }
  
  // Método para navegar para a tela de criação de clientes
  navigateToClienteCreate(): void {
    this.router.navigate(['/clientes/create']);
  }
}