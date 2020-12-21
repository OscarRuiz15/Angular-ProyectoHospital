import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contarTres()
      .then(mensaje => console.log('Termino!', mensaje))
      .catch(error => console.error('Error en la promesa', error));
  }

  ngOnInit(): void {
  }

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;
      // setInterval(function() {});
      const intervalo = setInterval(() => {
        contador++;
        console.log('Contador', contador);
        if (contador === 3) {
          resolve(true);
          // reject('Simplemente hubo un error');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
