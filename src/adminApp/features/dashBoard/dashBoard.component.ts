import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { VisitStatsService } from '../../core/services/visit-stats.service';
import { VisitStatsGraphComponent } from '../../../app/shared/components/visit-stats-graph/visit-stats-graph.component';

@Component({
  selector: 'app-dashBoard',
  standalone: true,
  imports: [CommonModule, VisitStatsGraphComponent],
  templateUrl: './dashBoard.component.html',
  styleUrl: './dashBoard.component.scss'
})
export class dashBoardComponent {
  adminEmail: string = '';
  visitStats: { Date: string, Count: number }[] = [];

  get totalViews(): number {
    return 1000 + this.visitStats.reduce((sum, stat) => sum + stat.Count, 0);
  }

  constructor(private router: Router, private visitStatsService: VisitStatsService) {
    this.adminEmail = sessionStorage.getItem('adminEmail') || '';
    this.visitStatsService.getVisitStats().subscribe({
      next: stats => {
        const total = stats.reduce((sum, stat) => sum + stat.Count, 0);
        this.visitStats = [{ Date: new Date().toISOString(), Count: 1000 + total }];
      },
      error: () => {
        this.visitStats = [{ Date: new Date().toISOString(), Count: 1000 }];
      }
    });
  }

  logout() {
    // Clear admin session
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminEmail');
    
    // Navigate to home page
    this.router.navigate(['/']);
  }
}