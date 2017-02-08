import { Component,Inject,forwardRef } from '@angular/core';
import {Http} from '@angular/http';
import {DashboardComponent} from '../dashboard.component';
@Component({
  templateUrl: './profil.template.html',
})
export class EmployeeProfilComponent  { 
	constructor(@Inject(forwardRef(() => DashboardComponent)) dashboardComponent: DashboardComponent){
		console.log("vous etes dans l'employee profil");
		console.log(dashboardComponent.user.login);

	}
}
