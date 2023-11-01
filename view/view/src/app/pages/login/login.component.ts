import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cpf: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (this.cpf.trim() === '') {
      this.showCpfAlert();
      return;
    }

    this.isLoading = true;
    this.authService.login(this.cpf).subscribe(
      result => {
        this.isLoading = false;
        if (result) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'CPF não encontrado, inválido ou cliente inativo.';
          this.showErrorMessageWithSweetAlert();
        }
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao efetuar o login. Por favor, tente novamente mais tarde.';
        this.showErrorMessageWithSweetAlert();
      }
    );
  }

  showCpfAlert(): void {
    Swal.fire({
      icon: 'warning',
      title: 'CPF em branco',
      text: 'Por favor, insira o CPF do cliente antes de fazer o login.',
      confirmButtonText: 'OK'
    });
  }

  showErrorMessageWithSweetAlert(): void {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: this.errorMessage,
      confirmButtonText: 'OK'
    });
  }
}
