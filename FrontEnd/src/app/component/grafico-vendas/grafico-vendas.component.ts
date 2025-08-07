import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartType, ChartData, ChartConfiguration, ChartDataset } from 'chart.js';
import { Observable, interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { VendaService } from '../venda/venda.service'; // Importa apenas o serviço
import { VendaSemana } from '../venda/venda.model'; // Importa VendaSemana do model
import { MatSnackBar } from '@angular/material/snack-bar';
import { VendaNotificacaoService } from '../venda/vendaNotificacaoService.ts/VendaNotificacaoService';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-grafico-vendas',
  templateUrl: './grafico-vendas.component.html',
  styleUrls: ['./grafico-vendas.component.css']
})
export class GraficoVendasComponent implements OnInit, OnDestroy {
  private vendaSubscription: Subscription = new Subscription();

  public barChartType: 'bar' = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Faturamento Bruto (R$)',
        data: [],
        backgroundColor: ['rgba(76, 175, 80, 0.8)', 'rgba(33, 150, 243, 0.8)', 'rgba(255, 152, 0, 0.8)', 'rgba(244, 67, 54, 0.8)', 'rgba(156, 39, 176, 0.8)', 'rgba(255, 235, 59, 0.8)', 'rgba(121, 85, 72, 0.8)'] as const,
        borderColor: ['#388E3C', '#1976D2', '#F57C00', '#D32F2F', '#7B1FA2', '#FBC02D', '#5D4037'] as const,
        borderWidth: 1
      } as ChartDataset<'bar'>
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff'
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const value = context.raw as number;
            return `${context.dataset.label}: R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#fff',
        font: {
          weight: 'bold',
          size: 12
        },
        formatter: (value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Semanas',
          color: '#fff'
        },
        ticks: { color: '#fff' },
        grid: { color: '#333' }
      },
      y: {
        title: {
          display: true,
          text: 'Faturamento Bruto(R$)',
          color: '#fff'
        },
        ticks: { color: '#fff' },
        grid: { color: '#333' },
        beginAtZero: true
      }
    }
  };

  constructor(
    private vendaService: VendaService,
    private vendaNotificacaoService: VendaNotificacaoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.atualizarGrafico();
    this.vendaSubscription = interval(30000)
      .pipe(switchMap(() => this.vendaService.getVendasPorSemana()))
      .subscribe({
        next: (vendasSemanais) => this.processarDadosVendas(vendasSemanais),
        error: (err) => {
          console.error('Erro ao atualizar gráfico:', err);
          this.snackBar.open('Erro ao carregar dados do gráfico', 'X', { duration: 3000 });
        }
      });

    this.vendaNotificacaoService.vendaCriada$.subscribe(() => {
      console.log('Nova venda detectada, atualizando gráfico...');
      this.atualizarGrafico();
    });
  }

  ngOnDestroy(): void {
    if (this.vendaSubscription) {
      this.vendaSubscription.unsubscribe();
    }
  }

  private atualizarGrafico(): void {
    this.vendaService.getVendasPorSemana().subscribe({
      next: (vendasSemanais) => this.processarDadosVendas(vendasSemanais),
      error: (err) => {
        console.error('Erro ao carregar vendas semanais:', err);
        this.snackBar.open('Erro ao carregar dados do gráfico', 'X', { duration: 3000 });
      }
    });
  }

  private processarDadosVendas(vendasSemanais: VendaSemana[]): void {
    vendasSemanais.sort((a, b) => {
      if (a.ano === b.ano) return a.semana - b.semana;
      return a.ano - b.ano;
    });

    const ultimasSemanas = vendasSemanais.slice(-7);
    const labels = ultimasSemanas.map(venda => `${venda.ano} - Semana ${venda.semana}`);
    const data = ultimasSemanas.map(venda => Number(venda.totalVendas));
    const backgroundColors = this.barChartData.datasets[0].backgroundColor as string[];
    const cores = ultimasSemanas.map((_, index) => backgroundColors[index % backgroundColors.length]);

    this.barChartData.labels = labels;
    this.barChartData.datasets[0].data = data;
    this.barChartData.datasets[0].backgroundColor = cores;
    this.barChartData.datasets[0].borderColor = cores.map(color => color.replace('0.8', '1'));
  }
}