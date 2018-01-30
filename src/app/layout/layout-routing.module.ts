import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'internos' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'promociones', loadChildren: '../promociones/promociones.module#PromocionesModule' },
            { path: 'directorio', loadChildren: '../directorio/directorio.module#DirectorioModule' },
            { path: 'carline', loadChildren: '../carline/carline.module#CarlineModule' },
            { path: 'marcasemi', loadChildren: '../marcasemi/marcasemi.module#MarcasemiModule' },
            { path: 'control/empresa', loadChildren: '../empresa/empresa.module#EmpresaModule' },
            { path: 'control/sucursales', loadChildren: '../empresa/empresa.module#EmpresaModule' },
            { path: 'control/marcas', loadChildren: '../empresa/empresa.module#EmpresaModule' },
            { path: 'control/tipounidad', loadChildren: '../tipounidad/tipounidad.module#TipounidadModule' },
            { path: 'control/moneda', loadChildren: '../tipounidad/tipounidad.module#TipounidadModule' },
            { path: 'usuarios', loadChildren: '../usuarios/usuarios.module#UsuariosModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
