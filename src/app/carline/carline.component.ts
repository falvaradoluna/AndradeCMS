import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routerTransition } from '../router.animations';
import { CarlineService } from './carline.service';
import { ICarline } from './carline';
import swal from 'sweetalert2';

@Component({
  selector: 'app-carline',
  templateUrl: './carline.component.html',
  styleUrls: ['./carline.component.scss'],
  animations: [routerTransition()]
})
export class CarlineComponent implements OnInit {

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
  carlines: ICarline[];

  constructor(private carlineService: CarlineService) { }

  ngOnInit() {
    this.getCarlines();
  }

  private getCarlines() {
    console.log('Va a invocar el servicio');
    this.carlineService.getCarlines().subscribe(respuesta => {
      this.temp_var = true;
      this.carlines = respuesta;
      console.log(this.carlines);
    }, error => {
      console.log('Ocurrio un error al obtener los carlines');
    });
  }

  deleteCarline(carlineId) {
    swal({
      title: '¿Desea eliminar el carline?',
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
        this.carlineService.DeleteCarline({ carlineId: carlineId })
          .subscribe(serverResponse => {
            swal(
              'Eliminado!',
              'Se elimino el carline.',
              'success'
            );
            this.getCarlines();
          },
          error => {
            console.log('Ocurrio un error al eliminar');
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

  // updateDirectorio(idDirectorio) {
  //   swal({
  //     title: '¿Desea actualizar el directorio?',
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Actualizar',
  //     cancelButtonText: 'Cancelar',
  //     confirmButtonClass: 'btn btn-success',
  //     cancelButtonClass: 'btn btn-danger',
  //     buttonsStyling: false,
  //   }).then((result) => {
  //     if (result.value) {
  //       this.directorioService.UpdateDirectorio({
  //         idDirectorio: idDirectorio,
  //         idEmpresa: this.idEmpresa,
  //         IdSucursal: this.IdSucursal,
  //         IdPuesto: this.IdPuesto,
  //         ApellidoPaterno: this.ApellidoPaterno,
  //         ApellidoMaterno: this.ApellidoMaterno,
  //         Nombre: this.Nombre,
  //         Correo: this.Correo,
  //         TelefonoOf: this.TelefonoOf,
  //         TelefonoCel: this.TelefonoCel,
  //         WhatsApp: this.WhatsApp,
  //         FaceBook: this.FaceBook,
  //         IdUsuario: JSON.parse(localStorage.getItem('UserData')).usu_id
  //       })
  //         .subscribe(serverResponse => {
  //           this.getDirectorios();
  //         },
  //         error => {
  //           console.log('Ocurrio un error al actualizar el directorio');
  //         });
  //     } else if (result.dismiss === 'cancel') {
  //       swal(
  //         'Cancelado',
  //         'No se actualizó.',
  //         'error'
  //       );
  //     }
  //   });
  // }
}
