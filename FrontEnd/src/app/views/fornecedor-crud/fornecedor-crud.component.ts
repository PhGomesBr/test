import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fornecedor-crud', // Define o seletor do componente
  templateUrl: './fornecedor-crud.component.html', // Caminho para o template HTML
  styleUrls: ['./fornecedor-crud.component.css'] // Caminho para o arquivo de estilos CSS
})
export class FornecedorCrudComponent implements OnInit {
    // Construtor para injetar o serviço de roteamento
    constructor(private router: Router) { }

    // Método chamado ao inicializar o componente
    ngOnInit(): void {
    }
    
    // Método para navegar para a tela de criação de fornecedores
    navigateToFornecedorCreate(): void {
      this.router.navigate(['/fornecedor/create']);
    }
}