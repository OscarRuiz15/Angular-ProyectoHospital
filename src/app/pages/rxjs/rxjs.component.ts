import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscriber, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {
    this.subscripcion = this.regresaObservable()/*.pipe(retry(2))*/
      .subscribe(
        numero => console.log('Subs', numero),
        error => console.error('Error en el observador', error),
        () => console.log('El observador terminó!')
      );
  }

  ngOnInit(): void {
  }

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador++;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        /*if (contador === 3) {
          observer.complete();
          clearInterval(intervalo);
        }*/
        /*if (contador === 2) {
          observer.error('Auxilio xd');
        }*/
      }, 1000);
    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        // console.log('Filter', valor, index);
        return valor % 2 !== 0;
      })
    );
  }

  ngOnDestroy(): void {
    console.log('La página se va a cerrar');
    this.subscripcion.unsubscribe();
  }

}
