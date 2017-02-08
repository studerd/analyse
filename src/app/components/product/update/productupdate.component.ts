import { Component,Inject } from '@angular/core';
import {Http} from '@angular/http';
import { Router ,ActivatedRoute} from '@angular/router';
import {ProductProvider} from '../../../providers/product.provider';
import {Product} from '../../../objets/product';
@Component({
  templateUrl: './productupdate.template.html',
})
export class ProductUpdateComponent  { 
	
	categorie='editer';
	product = new Product();
	constructor(protected router : Router,protected route:ActivatedRoute,@Inject(ProductProvider) public ProductProvider:ProductProvider){
		this.product = this.route.snapshot.params['id'];
	}
}
