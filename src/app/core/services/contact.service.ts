import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiBase = 'https://localhost:7155/api';
  private addContactUrl = `${this.apiBase}/contact/AddContact`;
  private downloadFileUrl = `${this.apiBase}/contact/DownloadFile`;

  constructor(private http: HttpClient) { }

  sendMessage(formData: FormData): Observable<any> {
    return this.http.post(this.addContactUrl, formData);
  }

  downloadFile(id: number) {
    return this.http.get(`${this.downloadFileUrl}/${id}`, {
      responseType: 'blob',
      observe: 'response'
    });
  }
}