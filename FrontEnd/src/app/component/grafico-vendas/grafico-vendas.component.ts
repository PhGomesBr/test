import { Component, OnInit } from '@angular/core';
import { ChartType, ChartData, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-grafico-vendas',
  templateUrl: './grafico-vendas.component.html',
  styleUrls: ['./grafico-vendas.component.css']
})
export class GraficoVendasComponent implements OnInit {

  public barChartType: ChartType = 'bar';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff' // ajuste se fundo escuro
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#fff' },
        grid: { color: '#333' }
      },
      y: {
        ticks: { color: '#fff' },
        grid: { color: '#333' }
      }
    }
  };

  public barChartData: ChartData<'bar'> = {
    labels: ['Sem 22/2025', 'Sem 23/2025', 'Sem 24/2025', 'Sem 25/2025', 'Sem 26/2025'],
    datasets: [
      {
        data: [1200, 1800, 1500, 2000, 1700], // dados falsos
        label: 'Vendas Semanais (R$)',
        backgroundColor: '#7209b7'
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {
    // Nenhuma chamada ao serviço, dados fixos para demo
  }
}
