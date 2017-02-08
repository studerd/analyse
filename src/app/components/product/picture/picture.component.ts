import { Component,Inject ,Directive,ViewChild} from '@angular/core';
import {Http} from '@angular/http';
import { Router,ActivatedRoute } from '@angular/router';
import {ProductProvider} from '../../../providers/product.provider';
import {Product} from '../../../objets/product';

@Component({
  templateUrl: './picture.template.html',
})
export class PictureAddComponent { 
  @ViewChild('form') form;
	loader:{loading:boolean,message:string};		// Gestion de l'affichage de loader
	error : {error:boolean,message:string}			// Gestion de l'affichage des erreurs
	success:{success:boolean,message:string}
	product ;	
    listPicture: Array<File>;	
    drag:boolean=false;					 
	constructor(protected router : Router,protected route:ActivatedRoute,@Inject(ProductProvider) public ProductProvider:ProductProvider){
		this.loader = {loading:true,message:"Chargement du produit #"+this.route.snapshot.params['id']}
		this.error = {error:false,message:""}
		this.product = new Product();
		this.success = {success:false,message:""};
        this.listPicture = [];
		this.ProductProvider.Detail(this.route.snapshot.params['id'])
			.then( (response)=>{
									console.log(response);
									if(response.result){
										this.product.Set(response);

									}
									this.loader.loading=false;
								},
					(error)=>{
									this.loader.loading=false;
								this.error = {	error:true,
												message:"Une erreur interne et survenue,veuillez recommencer. Si le problème persiste, veuillez contacter le responsable ."}
					})
	} 
	  BackToList(){
	    this.router.navigate(["/dashboard/product"]);
	  }
	  BackToDetail(){
	    this.router.navigate(["/dashboard/product-detail/"+this.product.id]);
	  }

	PushInList(data){ 
		
		this.pushFile(<Array<File>> data.target.files);
		this.form.nativeElement.reset();
	}
	DeleteInList(index){
		let temp : Array<File> = [];
		for(let i=0;i<this.listPicture.length;i++){
			if(i!=index){
				temp.push(this.listPicture[i]);
			}
		}
		this.listPicture = temp;
	}

	//Drag event
	dragenter(event){
		this.drag=true;
		return false;
	}
	dragleave(event){
		this.drag=false;
		return false;
	}
	dragover(event){
		this.drag=true;
		event.preventDefault()
		return false;
	}
	onDrop(event:any){
		this.drag=false;
		event.stopPropagation();
		this.pushFile(<Array<File>> event.dataTransfer.files);
		return false;
	}
	protected pushFile(data){
		for(let i=0;i<data.length;i++){
			if(this.beginsWith("image/",data[i].type)){
				this.listPicture.push(data[i]);
			}
		}
	}
	protected beginsWith (needle, haystack){
    	return (haystack.substr(0, needle.length) == needle);
	}

	protected upload(e) {
		e.preventDefault();
		//this.loader = {loading:true,message:"Chargement des images sur le serveur"};
        this.ProductProvider.UploadPicture([], this.listPicture).then((result) => {
        	this.loader.message="Images chargés avec succès, mise à jours du produit";
        	if(result.result){
        		this.product.pictures+=","+result.picture;
        		this.loader.message="Images chargés avec succès, mise à jours du produit";
        		this.ProductProvider.Update(this.product.GetFittedForUpdate()).then((result)=>{
        			if(result.result){
        				this.success = {success:true,message:result.message};
        			}
        		},(error)=>{console.log(error);})
        	}else{
        		this.loader.loading = false;
        	}

        }, (error) => {
        		this.loader.loading = false;
            console.error(error);
        });
    }
}
