import { Component,Inject } from '@angular/core';
import {Http} from '@angular/http';
import { Router,ActivatedRoute } from '@angular/router';
import {ProductProvider} from '../../../providers/product.provider';
import {Api} from '../../../providers/api.config';
import {Product} from '../../../objets/product';
@Component({
  templateUrl: './productdetail.template.html',
})
export class ProductDetailComponent  { 
	loader:{loading:boolean,message:string};		// Gestion de l'affichage de loader
	error : {error:boolean,message:string}			// Gestion de l'affichage des erreurs
	product ;								 
	list;							 
	listConditionement;			 
	listPack;			 
	technicalList;
	apiUrl;
	constructor(protected router : Router,protected route:ActivatedRoute,@Inject(ProductProvider) public ProductProvider:ProductProvider
		,@Inject(Api) public api:Api){
		this.apiUrl = this.api.GetUrl();
		this.loader = {loading:true,message:"Chargement du produit #"+this.route.snapshot.params['id']}
		this.error = {error:false,message:""}
		this.product = new Product();
		this.ProductProvider.Detail(this.route.snapshot.params['id'])
			.then( (response)=>{
									console.log(response);
									if(response.result){
										this.product.Set(response);
									}else{
										this.error = {error:true,message:"["+response.err_code+"] "+response.err_message}
									}
									this.loader.loading=false;
								},
					(error)=>{
									this.loader.loading=false;
								this.error = {	error:true,
												message:"Une erreur interne et survenue,veuillez recommencer. Si le problème persiste, veuillez contacter le responsable ."}
					})
		this.list = [	{field:'id',intitule:'Id'},
						{field:'date',intitule:'Date '},
						{field:'name',intitule:'Nom'},
						{field:'description',intitule:'Description'},
						{field:'price_htva',intitule:'Prix HTVA'},
						{field:'keyword',intitule:'Mot clés'},
						{field:'ref',intitule:'Reference'}
					];
		this.listConditionement =[ 
									{field:'condition',intitule:'Etat'},
									{field:'warehouse',intitule:'Entrepôt'},
									{field:'category',intitule:'Categorie'},
									{field:'disponibility',intitule:'Disponibilité'},
									{field:'brand',intitule:'Marque'}
								]
		this.listPack=[{field:'pack_only',intitule:'Produit pour pack?'},
						{field:'pack',intitule:'Pack'}];
		this.technicalList=[
						{field:'height',intitule:'Hauteur'},
						{field:'length',intitule:'Longueur'},
						{field:'width',intitule:'Largeur'},
						{field:'weight',intitule:'Poid'}];
	}
	BackToList(){
		this.router.navigate(["/dashboard/product"]);
	}
	EditerProduit(){
		this.router.navigate(['/dashboard/product-update/'+this.product.id]);
	}

	SupprimerProduit(){
		this.loader = {loading:true,message:"Suppression du produit en cours"}
		this.ProductProvider.Delete(this.product.id)
			.then((response)=>{
					console.log(response);
					this.loader.loading= false;
					this.router.navigate(["/dashboard/product"]);
				},
					(error)=>{console.log(error);})
	}
  AjouterImage(){
    this.router.navigate(["/dashboard/product-picture/"+this.product.id]);
  }
}
