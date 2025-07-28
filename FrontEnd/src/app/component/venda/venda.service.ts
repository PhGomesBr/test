import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from './venda.model'; // Importa o modelo Venda

export interface VendaSemana {
  ano: number;
  semana: number;
  totalVendas: number;
}

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private baseUrl = 'http://localhost:8080/vendas';  // URL para acessar as vendas
  private vendaSemanaUrl = 'http://localhost:8080/vendas/semana';  // URL para vendas semanais


  constructor(private http: HttpClient) { }

  create(venda: Venda): Observable<any> {
    return this.http.post<any>(this.baseUrl, venda);
  }  

  read(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.baseUrl);
  }

  readById(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.baseUrl}/${id}`);
  }

  // Método para obter vendas semanais (ex: total de vendas por semana)
  getVendasPorSemana(): Observable<VendaSemana[]> {
    return this.http.get<VendaSemana[]>(this.vendaSemanaUrl);
  }

  //Contador
private _vendaCount = 0;

setVendaCount(count: number) {
this._vendaCount = count;
}

getVendaCount(): number {
return this._vendaCount;
}


}
