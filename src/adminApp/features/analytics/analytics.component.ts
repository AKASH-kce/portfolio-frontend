import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitStatsService } from '../../core/services/visit-stats.service';
import { VisitStatsGraphComponent } from '../../../app/shared/components/visit-stats-graph/visit-stats-graph.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'admin-analytics',
  standalone: true,
  imports: [CommonModule, VisitStatsGraphComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  visitStats: { Date: string, Count: number, States: { State: string, Count: number }[] }[] = [];
  totalVisits: number | null = null;
  allVisits: any[] = [];

  constructor(private visitStatsService: VisitStatsService, private http: HttpClient) {
    this.visitStatsService.getVisitStats().subscribe({
      next: stats => {
        this.visitStats = stats;
        // Log state-wise visit counts
        const stateMap: { [key: string]: number } = {};
        for (const stat of this.visitStats) {
          if (Array.isArray(stat.States)) {
            for (const stateObj of stat.States) {
              const state = stateObj.State || 'Unknown';
              stateMap[state] = (stateMap[state] || 0) + (stateObj.Count ?? 0);
            }
          }
        }
        const stateCounts = Object.entries(stateMap).map(([state, count]) => ({ state, count }));
        console.log('State-wise visit counts:', stateCounts);
      },
      error: () => {
        this.visitStats = [];
      }
    });
    this.visitStatsService.getAllVisits().subscribe({
      next: visits => this.allVisits = visits,
      error: () => this.allVisits = []
    });
    // Fetch total visits
    this.http.get<{ TotalVisits: number }>('https://portfolio-backend-docker-isvl.onrender.com/api/contact/TotalVisits')
      .subscribe({
        next: res => {
          this.totalVisits = res.TotalVisits;
          // Log total visits
          console.log('Total visits:', this.totalVisits);
        },
        error: () => this.totalVisits = null
      });
  }

  deleteVisit(id: number) {
    this.visitStatsService.deleteVisit(id).subscribe({
      next: () => {
        this.allVisits = this.allVisits.filter(v => (v.id || v.Id) !== id);
      }
    });
  }
} 