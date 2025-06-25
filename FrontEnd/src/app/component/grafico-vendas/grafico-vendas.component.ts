import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-vendas',
  templateUrl: './grafico-vendas.component.html',
  styleUrls: ['./grafico-vendas.component.css']
})
export class GraficoVendasComponent implements OnInit {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  public barChartData: ChartConfiguration['data'] = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7'],
    datasets: [
      {
        data: [15, 25, 35, 45, 55, 65, 75],
        label: 'Vendas Semanais (R$)',
        backgroundColor: [
          '#7209b7', // Roxo escuro para Semana 1
          '#7209b7', // Roxo médio para Semana 2
          '#7209b7', // Roxo intenso para Semana 3
          '#7209b7', // Roxo claro para Semana 4
          '#7209b7', // Azul claro para Semana 5
          '#7209b7', // Azul médio para Semana 6
          '#7209b7'  // Azul escuro para Semana 7
        ],
      },
    ],
  };

  public barChartType: ChartType = 'bar';
barChartLabels: unknown[]|undefined;

  constructor() {}

  ngOnInit(): void {}
}