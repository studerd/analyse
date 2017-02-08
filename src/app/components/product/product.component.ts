import { Component,Inject } from '@angular/core';
import { Router } from '@angular/router';
import {Http} from '@angular/http';
import {ProductProvider} from '../../providers/product.provider';
@Component({
  templateUrl: './product.template.html',
})
export class ProductComponent  { 
	loader:{loading:boolean,message:string};		// Gestion de l'affichage de loader
	error : {error:boolean,message:string}			// Gestion de l'affichage des erreurs
	products : any[];								// Liste des contacts à afficher
	nbPages : any[];								// Nombre de page recupérées
	pageCourrante:number=null;						// Page courrante
	nbElement :number = null;						// Nombre d'element par page que l'on souhaite.
	pagestr:string;
	constructor(protected router : Router,@Inject(ProductProvider) public ProductProvider:ProductProvider){
		this.nbElement = 50;
		this.Retrieve();
	}
 	Retrieve(){
 		this.error = {error:false,message:""}
 		this.loader = {loading:true,message:"Chargement des produits, veuillez patienter"};
 		this.products = [];	
 		this.ProductProvider.Retrieve(this.pageCourrante,this.nbElement)
 			.then((retour)=>{
 					if(retour.result){
 						console.log(retour);
 						this.nbPages = new Array(retour.nbpage);
 						this.products = retour.data;
 						this.pageCourrante = (this.pageCourrante == null)?0:this.pageCourrante;
 						this.pagestr = "Produits "+(this.pageCourrante*this.nbElement)+" à "+((this.pageCourrante+1)*this.nbElement)+" sur "+retour.nbItems
 					}else{
 						this.error = {error:true,message:"["+retour.err_code+"] "+retour.err_message}
 					}
 					this.loader = {loading:false,message:"Chargement des produits, veuillez patienter"};	
 				},
 				  (error)=>{
 				  	alert(error);
 					this.loader = {loading:false,message:"Chargement des produits, veuillez patienter"};	
 				});
 	}

 	ShowDetail(id){
		this.router.navigate(["/dashboard/product-detail/"+id]);
 	}
 	AddProduct(){
		this.router.navigate(["/dashboard/product-add"]);
 	}
 	EditProduct(id){
		this.router.navigate(["/dashboard/product-update/"+id]);
 	}
 	DeleteProduct(index,id){
 		this.loader = {loading:true,message:"Suppression du produit en cours"};
 		this.ProductProvider.Delete(id).then((response)=>{
 			this.loader.loading = false;
 			if(response.result){
 				this.products.splice(index,1);
 			}
 		},(error)=>{this.loader.loading=false;})
 	}
 	ChangePage(val) {
 		this.pageCourrante = val;
 		this.Retrieve();
 	}
 	IsActiveButton(val){
 		return (this.pageCourrante == val);
 	}
}
