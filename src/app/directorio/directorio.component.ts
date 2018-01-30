import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routerTransition } from '../router.animations';
import { DirectorioService } from './directorio.service';
import { IDirectorio } from './directorio';
import swal from 'sweetalert2';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.scss'],
  animations: [routerTransition()]
})
export class DirectorioComponent implements OnInit {

  idEmpresa= 0;
  IdSucursal= 0;
  IdPuesto= 0;
  ApellidoPaterno= '';
  ApellidoMaterno= '';
  Nombre= '';
  Correo= '';
  TelefonoOf= '';
  TelefonoCel= '';
  WhatsApp= '';
  FaceBook= '';
  Orden= 0;
  IdUsuario= 0;

  public temp_var: Object= false;
  directorios: IDirectorio[];

  constructor(private directorioService: DirectorioService) { }

  ngOnInit() {
    this.getDirectorios();
  }

  private getDirectorios() {
    console.log('Va a invocar el servicio');
    this.directorioService.getDirectorios().subscribe(respuesta => {
      this.temp_var = true;
      this.directorios = respuesta;
      console.log(this.directorios);
    }, error => {
      console.log('Ocurrio un error al obtener los directorios');
    });
  }

  deleteDirectorio(directorioId) {
    swal({
      title: '¿Desea eliminar el directorio?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.directorioService.DeleteDirectorio({ directorioId: directorioId })
          .subscribe(serverResponse => {
            swal(
              'Eliminado!',
              'Se elimino el directorio con éxito.',
              'success'
            );
            this.getDirectorios();
          },
          error => {
            console.log('Ocurrio un error al eliminar el directorio');
          });
      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelado',
          'No se elimino.',
          'error'
        );
      }
    });
  }

  updateDirectorio(idDirectorio) {
    swal({
      title: '¿Desea actualizar el directorio?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.directorioService.UpdateDirectorio({
          idDirectorio: idDirectorio,
          idEmpresa: this.idEmpresa,
          IdSucursal: this.IdSucursal,
          IdPuesto: this.IdPuesto,
          ApellidoPaterno: this.ApellidoPaterno,
          ApellidoMaterno: this.ApellidoMaterno,
          Nombre: this.Nombre,
          Correo: this.Correo,
          TelefonoOf: this.TelefonoOf,
          TelefonoCel: this.TelefonoCel,
          WhatsApp: this.WhatsApp,
          FaceBook: this.FaceBook,
          IdUsuario: JSON.parse(localStorage.getItem('UserData')).usu_id
        })
          .subscribe(serverResponse => {
            this.getDirectorios();
          },
          error => {
            console.log('Ocurrio un error al actualizar el directorio');
          });
      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelado',
          'No se actualizó.',
          'error'
        );
      }
    });
  }
}
