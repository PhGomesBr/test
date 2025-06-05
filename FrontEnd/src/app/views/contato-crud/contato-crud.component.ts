import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contato } from 'src/app/component/contato/contato-read.model';
import { contatoService } from 'src/app/component/contato/contato.service';

@Component({
  selector: 'app-contato-crud', // Define o seletor do componente
  templateUrl: './contato-crud.component.html', // Caminho para o template HTML
  styleUrls: ['./contato-crud.component.css'] // Caminho para o arquivo de estilos CSS
})
export class ContatoCrudComponent implements OnInit {
  searchTerm: string = '';
  allContato: Contato[] = [];
  filteredContato: Contato[] = [];
    // Construtor para injetar o serviço de roteamento
    constructor(
       private router: Router,
       private contatoService: contatoService) { }

    // Método chamado ao inicializar o componente
    ngOnInit(): void {
      this.contatoService.read().subscribe((contato: Contato[]) => {
        this.allContato = contato;
        this.filteredContato = contato;
      });
    }

    // Método para navegar para a tela de criação de contatoes
    navigateToContatoCreate(): void {
      this.router.navigate(['/contato/create']);
    }
    // Método para filtrar a lista de contatoes com base no termo de pesquisa
    filterContato(): void {
      const term = this.searchTerm.toLowerCase();
      this.filteredContato = this.allContato.filter(C =>
        C.conEmail.toLowerCase().includes(term) ||
        C.conTelefoneComercial.toLowerCase().includes(term) ||
        C.conCelular.toLowerCase().includes(term)
      );
    }
}