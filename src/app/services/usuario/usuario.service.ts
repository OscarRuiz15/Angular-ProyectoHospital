import {Injectable} from '@angular/core';
import {Usuario} from '../../modelos/usuario.model';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SubirArchivoService} from '../subir-archivo/subir-archivo.service';
import {Icon} from '../../shared/enum/icon.enum';
import {SwalService} from '../shared/swal.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient,
              public router: Router,
              public _subirArchivoService: SubirArchivoService,
              public _swalService: SwalService) {
    this.cargarStorage();
  }

  estaLogueado() {
    return this.token.length > 5;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token}).pipe(
      map((response: any) => {
        this.guardarStorage(response.id, response.token, response.usuario);
        return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((response: any) => {
        this.guardarStorage(response.id, response.token, response.usuario);
        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(
      map((response: any) => {
        return response.usuario;
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(
      map((response: any) => {
        this.guardarStorage(response.usuario.id, this.token, response.usuario);
      })
    );
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((response: any) => {
        this.usuario.img = response.usuario.img;
        this._swalService.alert('Imagen actualizada', this.usuario.nombre, Icon.SUCCESS);
        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(response => {
        console.log(response);
      });
  }

  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.usuarios;
      })
    );
  }

  borrarUsuario(id: string) {
    const url = `${URL_SERVICIOS}/usuario/${id}?token=${this.token}`;

    return this.http.delete(url);
  }

}
