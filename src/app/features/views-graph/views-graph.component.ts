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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('https://portfolio-backend-docker-isvl.onrender.com/api/contact/VisitStats').subscribe({
      next: stats => {
        if (Array.isArray(stats) && stats.length > 0) {
          const normalizedStats = stats.map(stat => ({
            Date: stat.date,
            Count: stat.count,
            Countries: stat.countries?.map((c: { country: any; count: any; }) => ({
              Country: c.country,
              Count: c.count
            })) || [],
            States: stat.states?.map((s: { state: any; count: any; }) => ({
              State: s.state,
              Count: s.count
            })) || []
          }));
          this.visitStats = [...this.sampleStats, ...normalizedStats];
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
      for (const c of stat.Countries || []) {
        countryMap[c.Country] = (countryMap[c.Country] || 0) + c.Count;
      }
      for (const s of stat.States || []) {
        stateMap[s.State] = (stateMap[s.State] || 0) + s.Count;
      }
    }

    const countryData = Object.entries(countryMap).map(([name, value]) => ({ name, value }));
    const stateData = Object.entries(stateMap).map(([name, value]) => ({ name, value }));

    const pieChartBase = (titleText: string, subtitle: string, seriesName: string, data: any) => ({
      title: {
        text: titleText,
        subtext: subtitle,
        left: 'center',
        top: 10,
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
          fontSize: 15
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        top: 100,
        textStyle: {
          color: '#e2e8f0'
        }
      },
      series: [
        {
          name: seriesName,
          type: 'pie',
          radius: '60%',
          top: 30,
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            color: '#edf2f7',
            fontSize: 13,
            formatter:'{b}: {c} ({d}%)'
          },
          labelLine: {
            lineStyle: {
              color: '#edf2f7'
            }
          }
        }
      ],
      media: [
        {
          query: {
            maxWidth: 600
          },
          option: {
            legend: {
              orient: 'horizontal',
              left: 'center',
              bottom: 10,
              itemGap: 10,
              textStyle: {
                fontSize: 12
              }
            },
            series: [
              {
                radius: '50%',
                top: '10%',
                bottom: '20%'
              }
            ]
          }
        }
      ]

    });


    this.countryChartOptions = pieChartBase(
      '🌍 Portfolio Visits by Country',
      'Top countries visiting my portfolio',
      'Visits by Country',
      countryData
    );

    this.stateChartOptions = pieChartBase(
      '📊 Portfolio Visits by State',
      'Top states visiting my portfolio',
      'Visits by State',
      stateData
    );
  }
}
