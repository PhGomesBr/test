import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "http://localhost:8080/produtos";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  create(product: Product): Observable<Product> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Product>(this.baseUrl, product, { headers });
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.proId}`;
    return this.http.put<Product>(url, product);
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url);
  }

  // Método para buscar produtos com estoque baixo
  getProdutosEstoqueBaixo(limite: number = 5): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/estoque-baixo?limite=${limite}`);
  }

  // Método para contar produtos com estoque baixo (se você implementou o endpoint /estoque-baixo/count)
  getContagemEstoqueBaixo(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/estoque-baixo/count`);
  }

  // Mantém os métodos de contagem de produtos, se ainda forem necessários
  private _productCount = 0;

  setProductCount(count: number) {
    this._productCount = count;
  }

  getProductCount(): number {
    return this._productCount;
  }
}