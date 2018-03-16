import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routerTransition } from '../router.animations';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DirectorioService } from './directorio.service';
import { IDirectorio } from './directorio';
import { ISucursal } from '../promociones/sucursal';
import { PromocionesService } from '../promociones/promociones.service';
import swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { IResponse } from './response'

@Component({
	selector: 'app-directorio',
	templateUrl: './directorio.component.html',
	styleUrls: ['./directorio.component.scss'],
	animations: [routerTransition()]
})
export class DirectorioComponent implements OnInit {
	
	errorMessage: any;
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
	showCheckBox: number;
	checkboxValue:boolean;
	recibeMail : number = 0;
	
	private modalRef: NgbModalRef;
	private closeResult: string;

	public temp_var: Object = false;
	directorios: IDirectorio[];
	responseServer: IResponse[];
	responseServerUp: IResponse[];
	directorioTemp: any;
	directorioAdd: any;
	empresas: any[];
	puestos: any[];
	sucursales: any[];
	sucurcalById : any[];

	constructor(private directorioService: DirectorioService, private modalService: NgbModal, private promoService: PromocionesService) { }

	ngOnInit() {
		this.getDirectorios();
		this.getEmpresas();
		this.getPuestos();
		this.getSucursales();
	}

	private getDirectorios() {
		this.directorioService.getDirectorios().subscribe(respuesta => {
			this.temp_var = true;
			this.directorios = respuesta;
		}, error => {
			console.log('Ocurrio un error al obtener los directorios');
		});
	}

	private getEmpresas() {
		this.directorioService.getEmpresas().subscribe(respuesta => {
			this.empresas = respuesta;
		}, error => {
			console.log('Ocurrio un error al obtener las empresas');
		});
	}

	private getPuestos() {
		this.directorioService.getPuestos().subscribe(respuesta => {
			this.puestos = respuesta;
		}, error => {
			console.log('Ocurrio un error al obtener las puestos');
		});
	}

	private getSucursales() {
		this.directorioService.getSucursales().subscribe(respuesta => {
			this.sucursales = respuesta;
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
						this.temp_var = false;
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
		this.modalRef = this.modalService.open(contentUpdate);
		this.modalRef.result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
		this.directorioTemp = JSON.parse(JSON.stringify(updateDirectorio));
		console.log( this.directorioTemp );
		this.GetSucursalBy_empId(this.directorioTemp.em_IdEmpresa)
		if( this.directorioTemp.pu_IdPuesto === 8 || this.directorioTemp.pu_IdPuesto === 3 ){
			this.showCheckBox = 1;
		}else{
			this.showCheckBox = 0;
		}
		
		if( this.directorioTemp.di_recibeCorreo === 1 ){
			this.checkboxValue = true;
			this.directorioTemp.di_recibeCorreo = 1;
		}else{
			this.checkboxValue = false;
			this.directorioTemp.di_recibeCorreo = 0;
		}
	}

	updateDirectorio() {
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
				const usuarioId = JSON.parse(localStorage.getItem('UserData')).usu_id;
				this.changeMail();
				this.directorioTemp.di_recibeCorreo = this.recibeMail;
				this.directorioService.UpdateDirectorio(this.directorioTemp, usuarioId).subscribe(respuesta => {
					this.responseServerUp = respuesta;
					if( this.responseServerUp[0].success === 1 ){
						this.temp_var = false;
						this.getDirectorios();
						swal(
							'Listo',
							this.responseServerUp[0].msg,
							'success'
						);
						setTimeout(() => {
							this.modalRef.close();
						}, 500);
					}else{
						swal(
							'Listo',
							this.responseServerUp[0].msg,
							'error'
						);
					}
				}, error => {
					console.log('Ocurrio un error al actualizar los directorios');
				});
			} else if (result.dismiss === 'cancel') {
				swal(
					'Cancelado',
					'No se actualizo.',
					'error'
				);
			}
		});
	}

	onChangePuesto(newValue) {
		console.log( newValue );
		if (parseInt(newValue) === 3 || parseInt(newValue) === 8) {
			this.showCheckBox = 1;
		} else {
			this.showCheckBox = 0;
			this.recibeMail = 0;
		}
		console.log("showcheckBox", this.showCheckBox);
	}

	onChangePuestoUp(newValue) {
		console.log( newValue );
		if (parseInt(newValue) === 3 || parseInt(newValue) === 8) {
			this.showCheckBox = 1;
			this.checkboxValue = false;
		} else {
			this.showCheckBox = 0;
			this.checkboxValue = false;
		}
		this.changeMail();
	}

	onChangeEmpresa(newValueEmp) {
		this.directorioAdd.pi_IdSucursal = 0;
		this.GetSucursalBy_empId(newValueEmp);
	}

	onChangeEmpresaUp(newValueEmpUp) {
		this.directorioTemp.su_IdSucursal = 0;
		//this.directorioTemp.em_IdEmpresa = newValueEmpUp;
		this.GetSucursalBy_empId(newValueEmpUp);
	}

	GetSucursalBy_empId(empId){
        this.promoService.GetSucursalBy_empId({ empId: empId })
        .subscribe( sucurcalById => {
			this.sucurcalById = sucurcalById;
			
        },
        error => this.errorMessage = <any>error );
    }

	changeMail() {
		
		if( this.checkboxValue ){
			this.recibeMail = 1;
		}else{
			this.recibeMail = 0;
		}
    }

	showNuevo(contentAdd) {
		this.onChangePuesto(0);
		this.checkboxValue = false;
		this.modalRef = this.modalService.open(contentAdd);
		this.modalRef.result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		  }, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		  });
		this.directorioAdd = {
			pi_idEmpresa: 0,
			pi_IdSucursal: 0,
			pi_IdPuesto: 0
		};
	}

	addDirectorio() {
		this.directorioAdd.pn_IdUsuario = JSON.parse(localStorage.getItem('UserData')).usu_id;
		this.directorioAdd.pn_Orden = 1;
		this.directorioAdd.pn_RecibeMail = this.recibeMail;
		swal({
			title: '¿Desea agregar a el directorio?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Agregar',
			cancelButtonText: 'Cancelar',
			confirmButtonClass: 'btn btn-success',
			cancelButtonClass: 'btn btn-danger',
			buttonsStyling: false,
		}).then((result) => {
			if (result.value) {
				this.directorioService.InsertDirectorio(this.directorioAdd).subscribe(respuesta => {
					this.responseServer = respuesta
					if(this.responseServer[0].success === 1){
						this.temp_var = false;
						this.getDirectorios();
						swal(
							'Listo',
							this.responseServer[0].msg,
							'success'
						);
						setTimeout(() => {
							this.modalRef.close();
						}, 500);
					}else{
						swal(
							'Alto',
							this.responseServer[0].msg,
							'error'
						);
					}
				}, error => {
					console.log('Ocurrio un error al actualizar los directorios');
				});
				
			} else if (result.dismiss === 'cancel') {
				swal(
					'Cancelado',
					'No se agrego.',
					'error'
				);
			}
		});
	}

	private getDismissReason(reason: any): string {
		console.log( "GetDISMISS", reason );
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}
