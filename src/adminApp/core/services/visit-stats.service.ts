import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitStatsService {
  private apiUrl = 'https://portfolio-backend-docker-isvl.onrender.com/api/contact/VisitStats';

  constructor(private http: HttpClient) {}

  getVisitStats(): Observable<{ Date: string, Count: number, States: { State: string, Count: number }[] }[]> {
    return this.http.get<{ Date: string, Count: number, States: { State: string, Count: number }[] }[]>(this.apiUrl);
  }
} 