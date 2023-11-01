import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor() { }

  @HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    input.value = value.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
  }
}
