import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from './venda.model'; // Modelo da venda

// Interface para os dados de vendas semanais retornados pelo backend
export interface VendaSemana {
  ano: number;
  semana: number;
  totalVendas: number;
}

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  // URL base para todas as requisições relacionadas a vendas
  private baseUrl = 'http://localhost:8080/vendas';
  // URL específica para obter o faturamento por semana (confira se bate com o backend)
  private vendaSemanaUrl = `${this.baseUrl}/vendas-semanais`;

  // Contador interno (pode ser útil para outras funcionalidades)
  private _vendaCount = 0;

  constructor(private http: HttpClient) {}

  // Cria uma nova venda no backend
  create(venda: Venda): Observable<any> {
    return this.http.post<any>(this.baseUrl, venda);
  }

  // Lista todas as vendas
  read(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.baseUrl);
  }

  // Busca uma venda pelo ID
  readById(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.baseUrl}/${id}`);
  }

  // Obtém o faturamento total por semana (usado no gráfico)
  getVendasPorSemana(): Observable<VendaSemana[]> {
    return this.http.get<VendaSemana[]>(this.vendaSemanaUrl);
  }

  // Obtém o lucro total (opcional, já que você tem isso nos cards)
  getLucroTotal(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/lucro-total`);
  }

  // Define o contador de vendas (pode ser útil para estatísticas)
  setVendaCount(count: number) {
    this._vendaCount = count;
  }

  // Retorna o contador de vendas
  getVendaCount(): number {
    return this._vendaCount;
  }
}