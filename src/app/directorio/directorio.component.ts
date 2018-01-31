import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routerTransition } from '../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  directorioTemp: any;
  directorioAdd: any;
  empresas: any[];
  puestos: any[];
  sucursales: any[];

  constructor(private directorioService: DirectorioService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getDirectorios();
    this.getEmpresas();
    this.getPuestos();
    this.getSucursales();
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

  private getEmpresas() {
    this.directorioService.getEmpresas().subscribe(respuesta => {
      this.empresas = respuesta;
      console.log(this.empresas);
    }, error => {
      console.log('Ocurrio un error al obtener las empresas');
    });
  }

  private getPuestos() {
    this.directorioService.getPuestos().subscribe(respuesta => {
      this.puestos = respuesta;
      console.log(this.puestos);
    }, error => {
      console.log('Ocurrio un error al obtener las puestos');
    });
  }

  private getSucursales() {
    this.directorioService.getSucursales().subscribe(respuesta => {
      this.sucursales = respuesta;
      console.log(this.sucursales);
    }, error => {
      console.log('Ocurrio un error al obtener las sucursales');
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

  showUpdate(contentUpdate, updateDirectorio) {
    this.modalService.open(contentUpdate);
    this.directorioTemp = JSON.parse(JSON.stringify(updateDirectorio));
  }

  updateDirectorio() {
    const usuarioId = JSON.parse(localStorage.getItem('UserData')).usu_id;
    this.directorioService.UpdateDirectorio(this.directorioTemp, usuarioId).subscribe(respuesta => {
      console.log(respuesta);
      this.getDirectorios();
    }, error => {
      console.log('Ocurrio un error al actualizar los directorios');
    });
  }

  showNuevo(contentAdd) {
    this.modalService.open(contentAdd);
    this.directorioAdd = {};
  }

  addDirectorio() {
    this.directorioAdd.pn_IdUsuario = JSON.parse(localStorage.getItem('UserData')).usu_id;
    this.directorioAdd.pn_Orden = 1;
    this.directorioService.InsertDirectorio(this.directorioAdd).subscribe(respuesta => {
      console.log(respuesta);
      this.getDirectorios();
    }, error => {
      console.log('Ocurrio un error al actualizar los directorios');
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
