import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ICliente } from 'src/app/interfaces/cliente';
import { IConta } from 'src/app/interfaces/conta';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = false;
  private authenticatedClient: ICliente | null = null;
  private authenticatedAccount: IConta | null = null;

  constructor(private http: HttpClient) {}

  login(cpf: string): Observable<boolean> {
    return this.http.get<ICliente>(`http://localhost:8080/treinamento/rest/clientes/buscarPorCpf/${cpf}`).pipe(
      map((client: ICliente) => {
        if (client && client.ativo) {
          this.isAuthenticated = true;
          this.authenticatedClient = client;

          // Buscar as contas associadas ao cliente
          this.http.get<IConta[]>(`http://localhost:8080/treinamento/rest/contas/buscarContasDoCliente/${cpf}`).subscribe(
            (contas: IConta[]) => {
              if (contas.length > 0) {
                this.authenticatedAccount = contas[0]; // Você pode definir a lógica para escolher a conta certa se houver mais de uma
              }
            }
          );

          return true;
        } else {
          this.isAuthenticated = false;
          this.authenticatedClient = null;
          this.authenticatedAccount = null;
          return false;
        }
      }),
      catchError(error => {
        this.isAuthenticated = false;
        this.authenticatedClient = null;
        this.authenticatedAccount = null;
        return of(false);
      })
    );
  }
  logout(): void {
    this.isAuthenticated = false;
    this.authenticatedClient = null;
    this.authenticatedAccount = null;
  }

  // ... (outros métodos do AuthService)

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getAuthenticatedClient(): ICliente | null {
    return this.authenticatedClient;
  }

  getAuthenticatedAccount(): IConta | null {
    return this.authenticatedAccount;
  }
}
