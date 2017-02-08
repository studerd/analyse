import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import 'gsap';
import { HttpModule } from '@angular/http';
import { NgModule , Directive} from '@angular/core';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import {RouterModule,Route,ActivatedRouteSnapshot,RouterStateSnapshot} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import { Injectable } from "@angular/core";

import { DashboardComponent }  from './components/dashboard/dashboard.component';
import { EmployeeProfilComponent }  from './components/dashboard/employee/profil.component';
import { HomeComponent }  from './components/home/home.component';
import { LoginComponent }  from './components/login/login.component';
/* Product component : list, add,update,detail ----------------------------------------------- */
import { ProductComponent }  from './components/product/product.component';
import { ProductAddComponent }  from './components/product/ajout/productadd.component';
import { ProductDetailComponent }  from './components/product/detail/productdetail.component';
import { ProductUpdateComponent }  from './components/product/update/productupdate.component';
import {ProductFormBuilder} from './components/product/form/product.formbuilder';
import {PictureAddComponent} from './components/product/picture/picture.component';

/* Root component : composant de demarrage ---------------------------------------------------- */
import { AppComponent }  from './app.component';


import {SafePipe} from './pipes/safe.pipe';

import { AuthProvider }  from './providers/auth.provider';
import { Api }  from './providers/api.config';
import { MibProvider }  from './providers/mib.provider';
import { ProductProvider }  from './providers/product.provider';
import { SelectProvider }  from './providers/select.provider';


export const Routes = [
    // The top-level app state.
    // This state fills the root <ui-view></ui-view> (defined in index.html) with the AppComponent
    { path: '',redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent ,canActivate:[MibProvider],data: { roles: ['client','admin', 'PROGRAMMER']}},

    { path: 'dashboard',
      component: DashboardComponent ,
      canActivate:[MibProvider],data: { roles: ['admin', 'PROGRAMMER']},
      children: [
                  {
                    path: 'employee',
                    component: EmployeeProfilComponent,
                  },
                  {
                    path:'product',
                    component:ProductComponent,
                  },
                  {
                    path: 'product-add',
                    component: ProductAddComponent,
                  },
                  {
                    path:'product-update/:id',
                    component:ProductUpdateComponent
                  },
                  {
                    path:'product-detail/:id',
                    component:ProductDetailComponent
                  },
                  {
                    path:'product-picture/:id',
                    component:PictureAddComponent
                  }
                ],
      },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(Routes),
  ], 
  providers : [AuthProvider,MibProvider,Api,ProductProvider,SelectProvider],
  declarations: [SafePipe,
                  AppComponent,HomeComponent,LoginComponent,DashboardComponent,EmployeeProfilComponent,
                  ProductComponent,ProductAddComponent,ProductUpdateComponent,ProductDetailComponent,ProductFormBuilder,PictureAddComponent
                ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
