import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitStatsService } from '../../core/services/visit-stats.service';
import { VisitStatsGraphComponent } from '../../../app/shared/components/visit-stats-graph/visit-stats-graph.component';

@Component({
  selector: 'admin-analytics',
  standalone: true,
  imports: [CommonModule, VisitStatsGraphComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  visitStats: { Date: string, Count: number }[] = [];

  constructor(private visitStatsService: VisitStatsService) {
    this.visitStatsService.getVisitStats().subscribe({
      next: stats => {
        const total = stats.reduce((sum, stat) => sum + stat.Count, 0);
        this.visitStats = [{ Date: new Date().toISOString(), Count: 1000 + total }];
        console.log(this.visitStats);
      },
      error: () => {
        this.visitStats = [{ Date: new Date().toISOString(), Count: 1000 }];
      }
    });
  }
} 