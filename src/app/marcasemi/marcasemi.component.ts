import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  MarcasemiTemp: any;
  MarcasemiAdd: any;
  empresas: any[];

  constructor(private marcasemiService: MarcasemiService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getMarcasemis();
    this.getEmpresas();
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

  private getEmpresas() {
    this.marcasemiService.getEmpresas().subscribe(respuesta => {
      this.empresas = respuesta;
      console.log(this.empresas);
    }, error => {
      console.log('Ocurrio un error al obtener las empresas');
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

  showUpdate(contentUpdate, updateMarcasemi) {
    this.modalService.open(contentUpdate);
    this.MarcasemiTemp = JSON.parse(JSON.stringify(updateMarcasemi));
  }

  updateMarcasemi() {
    this.marcasemiService.UpdateMarcasemi(this.MarcasemiTemp).subscribe(respuesta => {
      console.log(respuesta);
      this.getMarcasemis();
    }, error => {
      console.log('Ocurrio un error al actualizar el marcasemi');
    });
  }

  showNuevo(contentAdd) {
    this.modalService.open(contentAdd);
    this.MarcasemiAdd = {};
  }

  addMarcasemi() {
    this.marcasemiService.InsertMarcasemi(this.MarcasemiAdd).subscribe(respuesta => {
      console.log(respuesta);
      this.getMarcasemis();
    }, error => {
      console.log('Ocurrio un error al actualizar el marcasemi');
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
