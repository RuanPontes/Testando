import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Adicione a classe 'show' após um pequeno atraso para acionar a animação
    setTimeout(() => {
      document.querySelector('.banner-content')?.classList.add('show');
      document.querySelector('.image-container')?.classList.add('show');
    }, 100);
  }

  isHomePage(): boolean {
    return this.router.url === '/';
  }
}
