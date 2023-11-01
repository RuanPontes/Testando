import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.css']
})
export class TransacoesComponent implements OnInit {

  formDeposito: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ContasService
  ) {
    this.formDeposito = this.formBuilder.group({
      agencia: ['', Validators.required],
      numeroConta: ['', Validators.required],
      valor: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  realizarDeposito(): void {
    const depositoData = this.formDeposito.value;

    this.contaService.deposito(depositoData).subscribe(
      () => {
        Swal.fire('Sucesso!', 'Depósito concluído!', 'success');
        this.formDeposito.reset();
      },
      error => {
        Swal.fire('Erro no depósito', 'Aconteceu alguma coisa no seu depósito', 'error');
      }
    );
  }
}
