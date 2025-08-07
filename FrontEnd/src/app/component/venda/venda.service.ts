import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda, VendaSemana, ChartDataResponse } from './venda.model';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private baseUrl = 'http://localhost:8080/vendas';
  private vendaSemanaUrl = `${this.baseUrl}/vendas-semanais`;
  private _vendaCount = 0;

  constructor(private http: HttpClient) {}

  create(venda: Venda): Observable<any> {
    return this.http.post<any>(this.baseUrl, venda);
  }

  read(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.baseUrl);
  }

  readById(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.baseUrl}/${id}`);
  }

  getVendasPorSemana(): Observable<VendaSemana[]> {
    return this.http.get<VendaSemana[]>(this.vendaSemanaUrl);
  }

  getLucroTotal(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/lucro-total`);
  }

  // Método para buscar os dados do gráfico de produtos mais vendidos
  getProdutosMaisVendidos(): Observable<ChartDataResponse> {
    return this.http.get<ChartDataResponse>(`${this.baseUrl}/grafico-produtos-mais-vendidos`);
  }

  setVendaCount(count: number) {
    this._vendaCount = count;
  }

  getVendaCount(): number {
    return this._vendaCount;
  }
}