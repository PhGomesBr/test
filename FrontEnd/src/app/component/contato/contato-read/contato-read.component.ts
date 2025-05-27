// Importa o decorador Component do Angular
import { Component, Input } from '@angular/core';
// Importa o modelo de dados Contato
import { Contato } from '../contato-read.model';
// Importa o serviço responsável por operações relacionadas a Contato
import { contatoService } from '../contato.service';

// Define o componente Angular
@Component({
  selector: 'app-contato-read', // Nome do seletor usado no HTML
  templateUrl: './contato-read.component.html', // Caminho para o template HTML
  styleUrls: ['./contato-read.component.css'] // Caminho para o arquivo de estilos CSS
})
export class ContatoReadComponent {
  @Input() // Termo de pesquisa para filtrar contatoes
  contato!: Contato[]; // Lista de contatoes
  displayedColumns = ['conId', 'conTelefoneComercial', 'conCelular', 'conEmail', 'action'];

  // Injeta o serviço ContatoService no construtor
  constructor(private contatoService: contatoService) {}

  // Método executado ao inicializar o componente
  ngOnInit(): void {
    this.contatoService.read().subscribe(contato => {
      this.contato = contato; // Atribui os dados recebidos à lista de contatoes
      console.log(contato); // Exibe os dados no console para depuração
    });
  }
}