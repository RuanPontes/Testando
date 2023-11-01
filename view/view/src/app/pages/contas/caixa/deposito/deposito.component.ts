import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { IConta } from 'src/app/interfaces/conta';
import { IDepositoSaque } from 'src/app/interfaces/deposito-saque';
import { AuthService } from 'src/app/services/auth.service';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent implements OnInit {

  formConta: FormGroup = new FormGroup({
    agencia: new FormControl('', Validators.required),
    numeroConta: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
  });

  clienteConta$: any;

  constructor(
    private authService: AuthService,
    private contaService: ContasService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('ngOnInit() foi chamado');

    const clienteConta: IConta | null = this.authService.getAuthenticatedAccount();
    console.log('Conta autenticada:', clienteConta);

    this.clienteConta$ = of(clienteConta);

    this.clienteConta$.subscribe((clienteConta: IConta | null) => {
      if (clienteConta) {
        console.log('Dados da conta obtidos:', clienteConta);

        this.formConta.patchValue({
          agencia: clienteConta.agencia,
          numeroConta: clienteConta.numero
        });
      } else {
        console.log('Nenhum dado da conta encontrado');
      }
    });
  }

  deposito() {
    const deposito: IDepositoSaque = this.formConta.value;
    this.contaService.deposito(deposito).subscribe(
      () => {
        Swal.fire('Sucesso!', 'Depósito concluído!', 'success');
        this.router.navigate(['/']);
      },
      error => {
        console.error(error);
      }
    );
  }

  preencheDeposito(conta?: IConta) {
    this.formConta.setValue({
      agencia: conta?.agencia || '',
      numeroConta: conta?.numero || '',
      valor: null,
    });
  }
}
