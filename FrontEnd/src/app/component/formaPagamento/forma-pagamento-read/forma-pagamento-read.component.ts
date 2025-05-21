// Importa o decorador Component do Angular
import { Component } from '@angular/core';
// Importa o modelo de dados FormaPagamento
import { FormaPagamento } from '../formaPagamento.model';
// Importa o serviço responsável por operações relacionadas a FormaPagamento
import { formaPagamentoService } from '../formaPagamento.service';

// Define o componente Angular
@Component({
  selector: 'app-forma-pagamento-read', // Nome do seletor usado no HTML
  templateUrl: './forma-pagamento-read.component.html', // Caminho para o template HTML
  styleUrls: ['./forma-pagamento-read.component.css'] // Caminho para o arquivo de estilos CSS
})
export class FormaPagamentoReadComponent {
    // Array para armazenar as formas de pagamento retornadas do serviço
    formaPagamento!: FormaPagamento[];
    // Define as colunas que serão exibidas na tabela
    displayedColumns = ['fpgId', 'fpgDescricao', 'action'];

    // Injeta o serviço formaPagamentoService no construtor
    constructor(private formaPagamentoService: formaPagamentoService) { }

    // Método executado ao inicializar o componente
    ngOnInit(): void {
      // Chama o método read do serviço para buscar as formas de pagamento
      this.formaPagamentoService.read().subscribe(formaPagamento => {
        this.formaPagamento = formaPagamento; // Armazena as formas de pagamento no array
        console.log(formaPagamento); // Exibe as formas de pagamento no console
      });
    }
}