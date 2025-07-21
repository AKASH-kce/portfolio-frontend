import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-views-graph',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './views-graph.component.html',
  styleUrls: ['./views-graph.component.scss']
})
export class ViewsGraphComponent implements OnInit {
  visitStats: any[] = [];
  countryChartOptions: any = {};
  stateChartOptions: any = {};
  loading = true;

  sampleStats = [
    {
      Date: '2024-07-20',
      Count: 10,
      States: [
        { State: 'California', Count: 4 },
        { State: 'Texas', Count: 3 },
        { State: 'Maharashtra', Count: 3 }
      ],
      Countries: [
        { Country: 'USA', Count: 7 },
        { Country: 'India', Count: 3 }
      ]
    },
    {
      Date: '2024-07-21',
      Count: 8,
      States: [
        { State: 'New York', Count: 2 },
        { State: 'Kerala', Count: 2 },
        { State: 'Bavaria', Count: 4 }
      ],
      Countries: [
        { Country: 'USA', Count: 2 },
        { Country: 'India', Count: 2 },
        { Country: 'Germany', Count: 4 }
      ]
    }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://portfolio-backend-docker-isvl.onrender.com/api/contact/VisitStats').subscribe({
      next: stats => {
        if (Array.isArray(stats) && stats.length > 0) {
          this.visitStats = [...this.sampleStats, ...stats];
        } else {
          this.visitStats = this.sampleStats;
        }
        this.setupCharts();
        this.loading = false;
      },
      error: () => {
        this.visitStats = this.sampleStats;
        this.setupCharts();
        this.loading = false;
      }
    });
  }

  setupCharts() {
    const countryMap: { [key: string]: number } = {};
    const stateMap: { [key: string]: number } = {};
    for (const stat of this.visitStats) {
      if (Array.isArray(stat.Countries)) {
        for (const c of stat.Countries) {
          countryMap[c.Country] = (countryMap[c.Country] || 0) + c.Count;
        }
      }
      if (Array.isArray(stat.States)) {
        for (const s of stat.States) {
          stateMap[s.State] = (stateMap[s.State] || 0) + s.Count;
        }
      }
    }
    const countryData = Object.entries(countryMap).map(([name, value]) => ({ name, value }));
    const stateData = Object.entries(stateMap).map(([name, value]) => ({ name, value }));

    this.countryChartOptions = {
      title: {
        text: '🌍 Portfolio Visits by Country',
        subtext: 'Where my site is viewed around the world',
        left: 'center',
        textStyle: {
          color: '#8a2be2', 
          fontSize: 22,
          fontWeight: 'bold',
          fontFamily: 'Montserrat, Arial, sans-serif',
          textShadowColor: '#181c2f', 
          textShadowBlur: 8
        },
        subtextStyle: {
          color: '#b2f5ea', 
          fontSize: 15,
          fontWeight: 'normal',
          fontFamily: 'Montserrat, Arial, sans-serif',
        }
      },
      tooltip: { trigger: 'item' },
      series: [
        {
          name: 'Visits',
          type: 'pie',
          radius: '60%',
          data: countryData,
          emphasis: {
            itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
          },
          animation: true
        }
      ]
    };
    this.stateChartOptions = {
      title: {
        text: '📊 Portfolio Visits by State',
        subtext: 'Top states visiting your portfolio',
        left: 'center',
        textStyle: {
          color: '#8a2be2', // Unified accent color
          fontSize: 22,
          fontWeight: 'bold',
          fontFamily: 'Montserrat, Arial, sans-serif',
          textShadowColor: '#181c2f', // Subtle dark shadow to match UI
          textShadowBlur: 8
        },
        subtextStyle: {
          color: '#b2f5ea', // Soft teal for subtitle
          fontSize: 15,
          fontWeight: 'normal',
          fontFamily: 'Montserrat, Arial, sans-serif',
        }
      },
      tooltip: { trigger: 'item' },
      series: [
        {
          name: 'Visits',
          type: 'bar',
          data: stateData.sort((a, b) => b.value - a.value),
          animation: true
        }
      ],
      xAxis: { type: 'category', data: stateData.map(d => d.name) },
      yAxis: { type: 'value' }
    };
  }
} 