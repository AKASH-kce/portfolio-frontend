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
  visitStats: { Date: string, Count: number }[] = [];
  totalVisits: number | null = null;

  constructor(private visitStatsService: VisitStatsService, private http: HttpClient) {
    this.visitStatsService.getVisitStats().subscribe({
      next: stats => {
        const total = stats.reduce((sum, stat) => sum + (stat.Count ?? 0), 0);
        this.visitStats = [{ Date: new Date().toISOString(), Count: 1000 + total }];
        console.log(this.visitStats);
      },
      error: () => {
        this.visitStats = [{ Date: new Date().toISOString(), Count: 1000 }];
      }
    });
    // Fetch total visits
    this.http.get<{ TotalVisits: number }>('https://portfolio-backend-docker-isvl.onrender.com/api/contact/TotalVisits')
      .subscribe({
        next: res => this.totalVisits = res.TotalVisits,
        error: () => this.totalVisits = null
      });
  }
} 