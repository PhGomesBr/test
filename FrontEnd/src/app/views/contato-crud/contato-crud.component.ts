import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contato-crud', // Define o seletor do componente
  templateUrl: './contato-crud.component.html', // Caminho para o template HTML
  styleUrls: ['./contato-crud.component.css'] // Caminho para o arquivo de estilos CSS
})
export class ContatoCrudComponent implements OnInit {
    // Construtor para injetar o serviço de roteamento
    constructor(private router: Router) { }

    // Método chamado ao inicializar o componente
    ngOnInit(): void {
    }
    
    // Método para navegar para a tela de criação de contatos
    navigateToContatoCreate(): void {
      this.router.navigate(['/contato/create']);
    }
}