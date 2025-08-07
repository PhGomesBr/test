import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartType, ChartData, ChartConfiguration, ChartDataset } from 'chart.js';
import { Observable, interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { VendaSemana, VendaService } from '../venda/venda.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// Plugin para exibir valores nas barras
import 'chartjs-plugin-datalabels';
import { VendaNotificacaoService } from '../venda/vendaNotificacaoService.ts/VendaNotificacaoService';

@Component({
  selector: 'app-grafico-vendas',
  templateUrl: './grafico-vendas.component.html',
  styleUrls: ['./grafico-vendas.component.css']
})
export class GraficoVendasComponent implements OnInit, OnDestroy {
  private vendaSubscription: Subscription = new Subscription();

  // Tipo do gráfico fixado como "bar" (literal) para evitar erros de tipagem
  public barChartType: 'bar' = 'bar'; // Corrigido para tipo literal

  // Dados do gráfico (labels e valores)
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

  // Configurações do gráfico (responsividade, escalas, etc.)
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff' // Cor da legenda (bom para temas escuros)
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const value = context.raw as number; // Força o tipo como número
            return `${context.dataset.label}: R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      },
      datalabels: {
        anchor: 'end', // Posiciona o label no topo da barra
        align: 'top', // Alinha o texto acima
        color: '#fff', // Cor do texto (visível em fundo escuro)
        font: {
          weight: 'bold', // Texto em negrito
          size: 12 // Tamanho da fonte
        },
        formatter: (value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` // Formata o valor
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
        beginAtZero: true // Começa em zero para melhor visualização
      }
    }
  };

  constructor(
    private vendaService: VendaService,
    private vendaNotificacaoService: VendaNotificacaoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Carrega os dados do gráfico assim que o componente é inicializado
    this.atualizarGrafico();

    // Atualiza o gráfico a cada 30 segundos para capturar novas vendas
    this.vendaSubscription = interval(30000)
      .pipe(switchMap(() => this.vendaService.getVendasPorSemana()))
      .subscribe({
        next: (vendasSemanais) => this.processarDadosVendas(vendasSemanais),
        error: (err) => {
          console.error('Erro ao atualizar gráfico:', err);
          this.snackBar.open('Erro ao carregar dados do gráfico', 'X', { duration: 3000 });
        }
      });

    // Escuta notificações de novas vendas e atualiza o gráfico imediatamente
    this.vendaNotificacaoService.vendaCriada$.subscribe(() => {
      console.log('Nova venda detectada, atualizando gráfico...'); // Depuração
      this.atualizarGrafico();
    });
  }

  ngOnDestroy(): void {
    // Limpa a assinatura do intervalo para evitar memory leaks
    if (this.vendaSubscription) {
      this.vendaSubscription.unsubscribe();
    }
  }

  private atualizarGrafico(): void {
    // Faz a requisição ao backend para obter os dados de vendas semanais
    this.vendaService.getVendasPorSemana().subscribe({
      next: (vendasSemanais) => this.processarDadosVendas(vendasSemanais),
      error: (err) => {
        console.error('Erro ao carregar vendas semanais:', err);
        this.snackBar.open('Erro ao carregar dados do gráfico', 'X', { duration: 3000 });
      }
    });
  }

  private processarDadosVendas(vendasSemanais: VendaSemana[]): void {
    // Ordena os dados por ano e semana para exibição cronológica
    vendasSemanais.sort((a, b) => {
      if (a.ano === b.ano) return a.semana - b.semana;
      return a.ano - b.ano;
    });

    // Limita o gráfico às últimas 7 semanas (ajuste se quiser mais)
    const ultimasSemanas = vendasSemanais.slice(-7);

    // Cria os labels (ex.: "2025 - Semana 31") e converte os valores para números
    const labels = ultimasSemanas.map(venda => `${venda.ano} - Semana ${venda.semana}`);
    const data = ultimasSemanas.map(venda => Number(venda.totalVendas)); // Garante que sejam números

    // Seleciona cores ciclicamente com base no número de semanas
    const backgroundColors = this.barChartData.datasets[0].backgroundColor as string[]; // Cast seguro
    const cores = ultimasSemanas.map((_, index) => backgroundColors[index % backgroundColors.length]);

    // Atualiza os dados do gráfico
    this.barChartData.labels = labels;
    this.barChartData.datasets[0].data = data;
    this.barChartData.datasets[0].backgroundColor = cores;
    this.barChartData.datasets[0].borderColor = cores.map(color => color.replace('0.8', '1')); // Ajusta opacidade da borda
  }
}