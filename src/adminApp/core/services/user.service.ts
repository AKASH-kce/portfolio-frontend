import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://portfolio-backend-docker-isvl.onrender.com/api/Users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  sendMassEmail(subject: string, message: string): Observable<any> {
    return this.http.post(this.apiUrl + '/send-mass-email', { subject, message });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`https://portfolio-backend-docker-isvl.onrender.com/api/contact/DeleteUser/${id}`);
  }
}