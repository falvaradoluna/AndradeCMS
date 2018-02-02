import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive: boolean = false;
    showMenu: string = '';
    showMenuTip: string = '';

    changeIconEmp: number = 0;
    changeIconTip: number = 0;
    userName: number;

    ngOnInit() {
        this.userName = JSON.parse( localStorage.getItem("UserData") ).usu_rol;
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    // addExpandClass(element: any) {
    //     if (element === this.showMenu) {
    //         this.showMenu = '0';
    //     } else {
    //         this.showMenu = element;
    //     }
    // }

    addExpandClassEmp(element: any) {
        if(this.changeIconEmp == 0){
            this.changeIconEmp = 1;
        }else{
            this.changeIconEmp = 0;
        }
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    addExpandClassTip(element: any) {
        if(this.changeIconTip == 0){
            this.changeIconTip = 1;
        }else{
            this.changeIconTip = 0;
        }
        if (element === this.showMenuTip) {
            this.showMenuTip = '0';
        } else {
            this.showMenuTip = element;
        }
    }
}
