import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/component/product/product.service';


@Component({
  selector: 'app-home', // Define o seletor do componente
  templateUrl: './home.component.html', // Caminho para o template HTML
  styleUrls: ['./home.component.css'] // Caminho para o arquivo de estilos CSS
})
export class HomeComponent implements OnInit{
    constructor(public productService: ProductService) {}
    productCount: number = 0;
  
    ngOnInit(): void {
      this.productService.read().subscribe(products => {
        this.productCount = products.length; // Conta a quantidade de produtos
      const count = this.productService.getProductCount();
    });}
  }