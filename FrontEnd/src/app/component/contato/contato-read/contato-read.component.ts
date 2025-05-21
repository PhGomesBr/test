// Importa o decorador Component do Angular
import { Component } from '@angular/core';
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
  // Array para armazenar os contatos retornados do serviço
  contato!: Contato[];
  // Define as colunas que serão exibidas na tabela
  displayedColumns = ['conId', 'conTelefoneComercial', 'conCelular', 'conEmail', 'action'];

  // Injeta o serviço contatoService no construtor
  constructor(private contatoService: contatoService) { }

  // Método executado ao inicializar o componente
  ngOnInit(): void {
    // Chama o método read do serviço para buscar os contatos
    this.contatoService.read().subscribe(contato => {
      this.contato = contato; // Armazena os contatos no array
      console.log(contato); // Exibe os contatos no console
    });
  }
}