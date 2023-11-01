import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContaService {
  private baseUrl = 'http://localhost:8080/treinamento/rest/contas';

  constructor(private http: HttpClient) {}

  sacar(agencia: string, numeroConta: string, valor: number): Observable<any> {
    const dto = {
      agencia: agencia,
      numeroConta: numeroConta,
      valor: valor,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.put(`${this.baseUrl}/sacar`, dto, { headers: headers });
  }
}
