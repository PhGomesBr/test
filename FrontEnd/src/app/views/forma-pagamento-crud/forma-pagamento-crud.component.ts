import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forma-pagamento-crud', // Define o seletor do componente
  templateUrl: './forma-pagamento-crud.component.html', // Caminho para o template HTML
  styleUrls: ['./forma-pagamento-crud.component.css'] // Caminho para o arquivo de estilos CSS
})
export class FormaPagamentoCrudComponent implements OnInit {
  // Construtor para injetar o serviço de roteamento
  constructor(private router: Router) { }

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
  }
  
  // Método para navegar para a tela de criação de forma de pagamento
  navigateToFormaPagamentoCreate(): void {
    this.router.navigate(['/formaPagamento/create']);
  }
}