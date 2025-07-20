import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-visit-stats-graph',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './visit-stats-graph.component.html',
  styleUrls: ['./visit-stats-graph.component.scss']
})
export class VisitStatsGraphComponent {
  @Input() visitStats: { Date: string, Count: number }[] = [];

  get maxCount(): number {
    return this.visitStats.length ? Math.max(...this.visitStats.map(s => s.Count)) : 1;
  }

  getBarHeight(count: number): number {
    if (this.maxCount > 0) {
      return Math.max((count / this.maxCount) * 100, 10);
    }
    return 10;
  }
} 