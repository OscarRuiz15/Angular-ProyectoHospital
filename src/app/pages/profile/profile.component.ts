import {Component, OnInit} from '@angular/core';
import {SwalService, UsuarioService} from '../../services/service.index';
import {Usuario} from '../../modelos/usuario.model';
import {Icon} from '../../shared/enum/icon.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemporal: string | ArrayBuffer;

  constructor(public _usuarioService: UsuarioService, public _swalService: SwalService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  guardar(usuario: Usuario) {
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.usuario.nombre = usuario.nombre;
    this._usuarioService.actualizarUsuario(this.usuario)
      .subscribe(response => {
        this._swalService.alert('Usuario actualizado', usuario.nombre, Icon.SUCCESS);
      });
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      this._swalService.alert('Solo imagenes', 'El archivo seleccionado no es una imagen', Icon.ERROR);
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemporal = reader.result;
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
