import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routerTransition } from '../router.animations';
import { MarcasemiService } from './marcasemi.service';
import { IMarcasemi } from './marcasemi';
import swal from 'sweetalert2';

@Component({
  selector: 'app-marcasemi',
  templateUrl: './marcasemi.component.html',
  styleUrls: ['./marcasemi.component.scss'],
  animations: [routerTransition()]
})
export class MarcasemiComponent implements OnInit {

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
  marcasemis: IMarcasemi[];

  constructor(private marcasemiService: MarcasemiService) { }

  ngOnInit() {
    this.getMarcasemis();
  }

  private getMarcasemis() {
    console.log('Va a invocar el servicio');
    this.marcasemiService.getMarcasemis().subscribe(respuesta => {
      this.temp_var = true;
      this.marcasemis = respuesta;
      console.log(this.marcasemis);
    }, error => {
      console.log('Ocurrio un error al obtener los directorios');
    });
  }

  deleteMarcasemi(marcasemiId) {
    swal({
      title: '¿Desea eliminar la marcasemi?',
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
        this.marcasemiService.DeleteMarcasemi({ marcasemiId: marcasemiId })
          .subscribe(serverResponse => {
            swal(
              'Eliminado!',
              'Se eliminó.',
              'success'
            );
            this.getMarcasemis();
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
