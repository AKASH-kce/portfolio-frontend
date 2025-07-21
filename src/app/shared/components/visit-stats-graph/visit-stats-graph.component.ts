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
  private _visitStats: { Date: Date, Count: number, States?: { State: string, Count: number }[] }[] = [];

  @Input() set visitStats(value: { Date: string, Count: number, States?: { State: string, Count: number }[] }[]) {
    this._visitStats = value?.map(stat => ({
      ...stat,
      Date: stat.Date ? new Date(stat.Date) : new Date(),
      Count: stat.Count ?? 0,
      States: Array.isArray(stat.States) ? stat.States : []
    })) ?? [];
    console.log('VisitStatsGraphComponent received:', this._visitStats);
  }

  get visitStats(): { Date: Date, Count: number, States?: { State: string, Count: number }[] }[] {
    return this._visitStats;
  }

  get maxCount(): number {
    return this.visitStats.length ? Math.max(...this.visitStats.map(s => s.Count ?? 0)) : 1;
  }

  getBarHeight(count: number): number {
    const safeCount = count ?? 0;
    if (this.maxCount > 0) {
      return Math.max((safeCount / this.maxCount) * 100, 10);
    }
    return 10;
  }

  // Get visit counts by state from States array if present
  getStateCounts(): { state: string, count: number }[] {
    const stateMap: { [key: string]: number } = {};
    for (const stat of this.visitStats) {
      if (Array.isArray(stat.States)) {
        for (const stateObj of stat.States) {
          const state = stateObj.State || 'Unknown';
          stateMap[state] = (stateMap[state] || 0) + (stateObj.Count ?? 0);
        }
      }
    }
    return Object.entries(stateMap).map(([state, count]) => ({ state, count })).sort((a, b) => b.count - a.count);
  }
}
