import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../fornecedor.model';
import { Router } from '@angular/router';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-create', // Define o seletor do componente
  templateUrl: './fornecedor-create.component.html', // Caminho para o template HTML
  styleUrls: ['./fornecedor-create.component.css'] // Caminho para o arquivo de estilos CSS
})
export class FornecedorCreateComponent implements OnInit {
  // Inicializa o objeto fornecedor com valores padrão
  fornecedor: Fornecedor = {
    forNomeFantasia: '',
    forCnpj: '',
    forRazaoSocial: '',
  };

  // Injeta o serviço FornecedorService e o roteador Router no construtor
  constructor(
    private fornecedorService: FornecedorService,
    private router: Router
  ) {}

  // Método executado ao inicializar o componente
  ngOnInit(): void {}

  // Método para criar um novo fornecedor
  createFornecedor(): void {
    this.fornecedorService.create(this.fornecedor).subscribe(() => {
      this.fornecedorService.showMessage('Fornecedor criado!'); // Exibe mensagem de sucesso
      this.router.navigate(['/fornecedor']); // Redireciona para a lista de produtos
    });
  }

  // Método para cancelar a criação e voltar para a lista de fornecedores
  cancel(): void {
    this.router.navigate(['/fornecedor']);
  }
}