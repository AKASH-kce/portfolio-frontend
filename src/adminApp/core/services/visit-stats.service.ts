import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisitStatsService {
  private apiUrl = 'https://portfolio-backend-docker-isvl.onrender.com/api/contact/VisitStats';

  constructor(private http: HttpClient) {}

  getVisitStats(): Observable<{ Date: string, Count: number, States: { State: string, Count: number }[] }[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(stats => stats.map(stat => ({
        Date: stat.date || stat.Date,
        Count: stat.count || stat.Count,
        States: (stat.states || stat.States || []).map((s: any) => ({
          State: s.state || s.State,
          Count: s.count || s.Count
        }))
      })))
    );
  }

  getAllVisits(): Observable<any[]> {
    return this.http.get<any[]>('https://portfolio-backend-docker-isvl.onrender.com/api/contact/AllVisits');
  }
} 