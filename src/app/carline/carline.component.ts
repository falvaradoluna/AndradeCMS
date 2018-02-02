import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routerTransition } from '../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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

  idEmpresa = 0;
  IdSucursal = 0;
  IdPuesto = 0;
  ApellidoPaterno = '';
  ApellidoMaterno = '';
  Nombre = '';
  Correo = '';
  TelefonoOf = '';
  TelefonoCel = '';
  WhatsApp = '';
  FaceBook = '';
  Orden = 0;
  IdUsuario = 0;

  public temp_var: Object = false;
  carlines: ICarline[];
  empresas: any[];
  carlineTemp: any;
  carlineAdd: any;

  constructor(private carlineService: CarlineService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getCarlines();
    this.getEmpresas();
  }

  private getCarlines() {

    this.carlineService.getCarlines().subscribe(respuesta => {
      this.temp_var = true;
      this.carlines = respuesta;
      console.log(this.carlines);
    }, error => {
      console.log('Ocurrio un error al obtener los carlines');
    });
  }

  private getEmpresas() {
    this.carlineService.getEmpresas().subscribe(respuesta => {
      this.empresas = respuesta;
      console.log(this.empresas);
    }, error => {
      console.log('Ocurrio un error al obtener las empresas');
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

  showUpdate(contentUpdate, updateCarline) {
    this.modalService.open(contentUpdate);
    this.carlineTemp = JSON.parse(JSON.stringify(updateCarline));
  }

  updateCarline() {

    this.carlineService.UpdateCarline(this.carlineTemp).subscribe(respuesta => {
      console.log(respuesta);
      this.getCarlines();
    }, error => {
      console.log('Ocurrio un error al actualizar los carlines');
    });
  }

  showNuevo(contentAdd) {
    this.modalService.open(contentAdd);
    this.carlineAdd = {};
  }

  addCarline() {

    this.carlineService.InsertCarline(this.carlineAdd).subscribe(respuesta => {
      console.log(respuesta);
      this.getCarlines();
    }, error => {
      console.log('Ocurrio un error al actualizar los carlines');
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
