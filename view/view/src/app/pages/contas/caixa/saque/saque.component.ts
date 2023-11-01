import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { IConta } from 'src/app/interfaces/conta';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.css']
})
export class SaqueComponent implements OnInit {
  formSaque: FormGroup;
  clienteConta$!: Observable<IConta | null>;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.formSaque = this.fb.group({
      agencia: [''],
      numeroConta: [''],
      valor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit() foi chamado');
  
    const clienteConta = this.authService.getAuthenticatedAccount();
    console.log('Conta autenticada:', clienteConta); // Verifique o objeto retornado
  
    this.clienteConta$ = of(clienteConta);
  
    this.clienteConta$.subscribe((clienteConta) => {
      if (clienteConta) {
        console.log('Dados da conta obtidos:', clienteConta);
  
        this.formSaque.patchValue({
          agencia: clienteConta.agencia,
          numeroConta: clienteConta.numero
        });
      } else {
        console.log('Nenhum dado da conta encontrado');
      }
    });
  }

  saque(): void {
    if (this.formSaque.valid) {
      const dadosSaque = this.formSaque.value;
      this.http.put('http://localhost:8080/treinamento/rest/contas/sacar', dadosSaque)
        .subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Saque efetuado com sucesso!',
              text: 'O saque foi realizado com sucesso.',
            });
            this.router.navigate(['/']);
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Erro no saque',
              text: 'Ocorreu um erro ao tentar efetuar o saque.',
            });
            console.error('Erro no Saque:', error);
          }
        );
    }
  }
}
