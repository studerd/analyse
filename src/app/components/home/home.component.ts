import { Component } from '@angular/core';
import {Http} from '@angular/http';
@Component({
  templateUrl: './home.template.html',
})
export class HomeComponent  { 
	constructor(){
		console.log("vous etes sur l'accueil");
	}
}
