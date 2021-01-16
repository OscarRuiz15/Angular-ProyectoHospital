import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../modelos/usuario.model';
import {UsuarioService} from '../../services/usuario/usuario.service';
import {SwalService} from '../../services/shared/swal.service';
import {Icon} from '../../shared/enum/icon.enum';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService,
              public swallService: SwalService) {
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((response: any) => {
        this.totalRegistros = response.total;
        this.usuarios = response.usuarios;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }


  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      this.swallService.alert('Error', 'No se puede borrar a si mismo', Icon.ERROR);
      return;
    }

    this.swallService.confirm('Esta seguro?', 'Esta a punto de borrar a ' + usuario.nombre,
      'warning',
      'Si',
      'No',
      {
        clickConfirm: () => this.borrar(usuario._id)
      }
    );
  }

  borrar(id: string) {
    return this._usuarioService.borrarUsuario(id).subscribe(() => {
      this.desde = 0;
      this.cargarUsuarios();
      this.swallService.toast('Se eliminó correctamente');
    });
  }
}
