import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {ProductFormBuilder} from '../form/product.formbuilder';
import {Product} from '../../../objets/product';
@Component({
  templateUrl: './productadd.template.html',
})
export class ProductAddComponent  { 
	categorie='ajouter';
	product = 0;
	constructor(protected router : Router){}


}
