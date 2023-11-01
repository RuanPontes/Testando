import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { IConta } from 'src/app/interfaces/conta';
import { ITransferencia } from 'src/app/interfaces/transferencia';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service'; // Importe o serviço AuthService, se existir

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {
  formTransfe: FormGroup;
  clienteConta$: any;
  formConta: any;

  constructor(
    private transferenciaService: ContasService,
    private authService: AuthService, // Injete o serviço AuthService, se existir
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formTransfe = new FormGroup({
      agenciaOrigem: new FormControl('', Validators.required),
      agenciaDestino: new FormControl('', Validators.required),
      numeroContaOrigem: new FormControl('', Validators.required),
      numeroContaDestino: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit() foi chamado');

    const clienteConta: IConta | null = this.authService.getAuthenticatedAccount(); // Certifique-se de que authService possua um método getAuthenticatedAccount()
    console.log('Conta autenticada:', clienteConta);

    this.clienteConta$ = of(clienteConta);

    this.clienteConta$.subscribe((clienteConta: IConta | null) => {
      if (clienteConta) {
        console.log('Dados da conta obtidos:', clienteConta);

        this.formTransfe.patchValue({
          agenciaOrigem: clienteConta.agencia,
          numeroContaOrigem: clienteConta.numero
        });
      } else {
        console.log('Nenhum dado da conta encontrado');
      }
    });
  }

  transferir() {
    const transferencia: ITransferencia = this.formTransfe.value;
    this.transferenciaService.transferencia(transferencia).subscribe(
      result => {
        Swal.fire("Tudo certo!", 'Transferência realizada com sucesso!', 'success');
        this.router.navigate(['/']);
      },
      error => {
        Swal.fire('Digitou algo errado?', 'Aconteceu um erro na sua transferência', 'error');
        console.error(error);
      }
    );
  }

  preencheTransf(conta?: IConta) {
    this.formTransfe.patchValue({
      agenciaOrigem: conta?.agencia,
      numeroContaOrigem: conta?.numero
    });
  }
}
