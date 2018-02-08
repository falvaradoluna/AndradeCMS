import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { routerTransition } from '../router.animations';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { trigger,style,transition,animate,keyframes,query,stagger,group, state, animateChild } from '@angular/animations';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    NgForm,
} from '@angular/forms';
import  swal  from "sweetalert2";

@Component({
  selector: 'app-catunidad',
  templateUrl: './catunidad.component.html',
  styleUrls: ['./catunidad.component.scss'],
  animations: [routerTransition()]
})
export class CatunidadComponent implements OnInit {

    public data :       object;
    public temp_var:    Object = false;

    constructor(private _http: HttpClient, private modalService: NgbModal) { }

    private _urlgetUnidades = "api/catunidad/unidadesnuevas";

    ngOnInit() {
        this.getUnidades();
    }

    getUnidades(){
        this._http.get(this._urlgetUnidades).subscribe((res: Response) => {
            this.data = res;
            this.temp_var = true;
          });
    };

    //================================================================= M O D A L E S =================================================//

  //========= MODAL INSERT ========//
  openImgModal(ModalImg) {
    this.modalService.open( ModalImg, { size: "lg" } );
}

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
}

}
