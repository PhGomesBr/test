// Importa o decorador Component do Angular
import { Component, Input } from '@angular/core';
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
  @Input() // Termo de pesquisa para filtrar formaPagamentoes
  formaPagamento!: FormaPagamento[]; // Lista de formaPagamentoes
  displayedColumns = ['fpgId', 'fpgDescricao', 'action'];

  // Injeta o serviço FormaPagamentoService no construtor
  constructor(private formaPagamentoService: formaPagamentoService) {}

  // Método executado ao inicializar o componente
  ngOnInit(): void {
    this.formaPagamentoService.read().subscribe(formaPagamento => {
      this.formaPagamento = formaPagamento; // Atribui os dados recebidos à lista de formaPagamentoes
      console.log(formaPagamento); // Exibe os dados no console para depuração
    });
  }
}