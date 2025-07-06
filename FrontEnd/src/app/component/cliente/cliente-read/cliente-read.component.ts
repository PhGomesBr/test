import { Component, Input } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service'; 

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent {
  @Input()
  cliente!: Cliente[];
  displayedColumns = [
    'cliId',
    'cliNome',
    'cliCpf',
    'conEmail',
    'conCelular',
    'conTelefoneComercial',
    'endRua',
    'endNumero',
    'endCidade',
    'endCep',
    'endEstado',
    'action'
  ];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.read().subscribe(cliente => {
      this.cliente = cliente;
      console.log(cliente);
    });
  }
}