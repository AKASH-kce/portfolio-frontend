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

  constructor(private http: HttpClient) { }

ngOnInit() {
  this.http.get<any[]>('https://portfolio-backend-docker-isvl.onrender.com/api/contact/VisitStats').subscribe({
    next: stats => {
      let normalizedStats: any[] = [];

      if (Array.isArray(stats) && stats.length > 0) {
        normalizedStats = stats.map(stat => ({
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
      }

      // ✅ Add sample data
      const sampleData = {
        Date: new Date().toISOString(),
        Count: 50,
        Countries: [
          { Country: "India", Count: 20 },
          { Country: "USA", Count: 15 },
          { Country: "Germany", Count: 10 },
          { Country: "Japan", Count: 5 }
        ],
        States: [
          { State: "Kerala", Count: 12 },
          { State: "California", Count: 8 },
          { State: "Bavaria", Count: 6 },
          { State: "Tokyo", Count: 4 }
        ]
      };

      // merge original + sample
      this.visitStats = [...normalizedStats, sampleData];

      this.setupCharts();
      this.loading = false;
    },
    error: () => {
      // fallback only with sample data
      this.visitStats = [{
        Date: new Date().toISOString(),
        Count: 50,
        Countries: [
          { Country: "India", Count: 20 },
          { Country: "USA", Count: 15 },
          { Country: "Germany", Count: 10 },
          { Country: "Japan", Count: 5 }
        ],
        States: [
          { State: "Kerala", Count: 12 },
          { State: "California", Count: 8 },
          { State: "Bavaria", Count: 6 },
          { State: "Tokyo", Count: 4 }
        ]
      }];
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
            formatter: '{b}: {c} ({d}%)'
          },
          labelLine: {
            lineStyle: {
              color: '#edf2f7'
            }
          }
        }
      ]
    });

    const countryOptions = pieChartBase(
      '🌍 Portfolio Visits by Country',
      'Top countries visiting my portfolio',
      'Visits by Country',
      countryData
    );

    const stateOptions = pieChartBase(
      '📊 Portfolio Visits by State',
      'Top states visiting my portfolio',
      'Visits by State',
      stateData
    );

    this.countryChartOptions = {
      ...countryOptions,
      media: [
        {
          query: { maxWidth: 600 },
          option: {
            title: [
              {
                subtext: 'Top country visiting my portfolio',
                left: 'center',
                top: 10,
                textStyle: {
                  color: '#8a2be2',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat, Arial, sans-serif'
                },
                subtextStyle: {
                  color: '#b2f5ea',
                  fontSize: 14
                }
              },
              {
                text: '👇 Click on legend to disable country for better view',
                left: 'center',
                top: 70,
                textStyle: {
                  color: '#facc15',
                  fontSize: 13,
                  fontWeight: 'normal'
                }
              }
            ],
            legend: {
              type: 'scroll',
              orient: 'horizontal',
              left: 'center',
              top: 100,
              bottom: 10,
              itemGap: 10,
              textStyle: {
                color: '#be395cff',
                fontSize: 15,
                fontWeight: 'bold'
              }
            },
            series: [
              {
                radius: '50%',
                top: '35%',
                bottom: '0%'
              }
            ]
          }
        }
      ]
    };

    this.stateChartOptions = {
      ...stateOptions,
      media: [
        {
          query: { maxWidth: 600 },
          option: {
            title: [
              {
                subtext: 'Top states visiting my portfolio',
                left: 'center',
                top: 10,
                textStyle: {
                  color: '#8a2be2',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat, Arial, sans-serif'
                },
                subtextStyle: {
                  color: '#b2f5ea',
                  fontSize: 14
                }
              },
              {
                text: '👇 Click on legend to disable states for better view',
                left: 'center',
                top: 70,
                textStyle: {
                  color: '#facc15',
                  fontSize: 13,
                  fontWeight: 'normal'
                }
              }
            ],
            legend: {
              type: 'scroll',
              orient: 'horizontal',
              left: 'center',
              top: 100,
              bottom: 10,
              itemGap: 10,
              textStyle: {
                color: '#be395cff',
                fontSize: 15,
                fontWeight: 'bold'
              }
            },
            series: [
              {
                radius: '50%',
                top: '35%',
                bottom: '0%'
              }
            ]
          }
        }
      ]
    };
  }
}
