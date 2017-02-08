import { Component,Inject,Input } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder } from '@angular/forms';
import {ProductProvider} from '../../../providers/product.provider';
import {SelectProvider} from '../../../providers/select.provider';
import {Product} from '../../../objets/product';
import {Api} from '../../../providers/api.config';
import { Router } from '@angular/router';
@Component({
  selector:'product-form',
  templateUrl: './form.template.html'
})
export class ProductFormBuilder{
  // Variable permettant de determiner si c'est pour ajouter ou editer
  @Input() categorie:string;
  @Input() id:number;
  success;
  loader;  
  error ;
  product:Product = new Product(); 
  // Tableaux des erreurs et message pour le remplir ------   
	errors:any;
	messages:any;
	form:FormGroup
  // Propriétés pour les selects dans la formulaire -------
  brands;
  disponibilities;
  conditions;
  warehouses;
  categories;
  simpleInput;
  listInput;
  tsInput;
  descinput={focus:false};
  dateinput={focus:false};
  pack={focus:false};
  packonly={focus:false};
  //Technical specification generator --------------------
  ts_detail;
  intituleBtn:string ="Créer un produit";
  pictures;
  picturesToDelete;
  apiUrl;
  constructor(@Inject(SelectProvider) public SelectProvider:SelectProvider,
              @Inject(ProductProvider) public ProductProvider:ProductProvider,
              protected router : Router,@Inject(Api) public api:Api){
    //this.FormBuilderInit();
    this.VarInit();
  }
  ngAfterViewInit(){
    
      this.FormBuilder();
      this.ProductProvider.Detail(this.id)
      .then( (response)=>{
                  if(response.result){
                    this.product.Set(response);
                  }
                  this.FormBuilder();
                },
          (error)=>{
            this.FormBuilder();
          })
    }
   protected FormBuilder(){
     let formBuilder = new FormBuilder();
    this.ts_detail = this.product.technical_data;
    this.pictures = this.product.picturesArr;
    this.form = formBuilder.group({
      product_ref:[this.product.ref,[Validators.required]],
      product_name: [this.product.name,[Validators.required,Validators.minLength(5),Validators.maxLength(35)]],
      product_price_htva:[this.product.price_htva,[Validators.required,Validators.pattern('[0-9]*([,.][0-9]*)?$')]],
      product_keyword:[this.product.keyword],

      product_cat:[this.product.category.id,[Validators.required]],
      product_brand:[this.product.brand.id,[Validators.required]],
      product_condition:[this.product.condition.id,[Validators.required]],
      product_warehouse:[this.product.warehouse.id],
      product_disponibility:[this.product.disponibility.id,[Validators.required]],

      product_description:[this.product.description],
      product_technical_data:[''],
      product_date:[this.product.date,[Validators.required]],
      product_pack_only:[this.product.pack_only,[Validators.required]],
      product_pack:[this.product.pack,[Validators.required]],

      ts_width:[this.product.width,[Validators.required,Validators.pattern('[0-9]*([,.][0-9]*)?$')]],
      ts_height:[this.product.height,[Validators.required,Validators.pattern('[0-9]*([,.][0-9]*)?$')]],
      ts_length:[this.product.length,[Validators.required,Validators.pattern('[0-9]*([,.][0-9]*)?$')]],
      ts_weight:[this.product.weight,[Validators.required,Validators.pattern('[0-9]*([,.][0-9]*)?$')]],
    });
    this.form.valueChanges.subscribe(data => this.OnValueChanged(data));
    this.intituleBtn = (this.categorie == "ajouter")? "Créer le produit": "Editer le produit";
  
   }
  protected VarInit(){
    this.apiUrl = this.api.GetUrl();
    this.picturesToDelete = [];
    this.loader = {loading:true,message:"Chargement des composants"}
    this.success = {success:false,message:""};
    this.error = {error:false,message:""}
    this.brands = {loading:true,data:[]};
    this.disponibilities = {loading:true,data:[]};
    this.conditions = {loading:true,data:[]};
    this.warehouses = {loading:true,data:[]};
    this.categories = {loading:true,data:[]};
    this.tsInput = [{name:'ts_width',display:'Largeur *',focus:false},
                    {name:'ts_height',display:'hauteur *',focus:false},
                    {name:'ts_length',display:'Longueur *',focus:false},
                    {name:'ts_weight',display:'Poid *',focus:false}];
      // Gestion des messages d'erreur.
      this.errors = {
        'product_ref':[],
        'product_name':[],
        'product_price_htva':[],
        'contact_mobile':[],
        'product_keyword':[],
        'product_cat':[],
        'product_brand':[],
        'product_condition':[],
        'product_warehouse':[],
        'product_disponibility':[],
        'product_description':[],
        'product_date':[],
        'product_technical_data':[],
        'product_pack_only':[],
        'product_pack':[],
        'ts_width':[],
        'ts_height':[],
        'ts_length':[],
        'ts_weight':[]
      }
      this.messages = {

        'product_name':{   'required'  :'Le nom est neccessaire',
                          'minlength'  :'Le nom doit faire minimum 5 caractères',
                          'maxlength'  :'Le nom doit faire maximum 35 caractères',
            },
        'product_ref':{'required'  :'La référence est neccessaire'},
        'product_price_htva':{'required'  :'Le prix est neccessaire','pattern':'Le prix doit être numerique'},
        'contact_mobile':{},
        'product_keyword':{},
        'product_cat':{'required'  :'La catégorie est neccessaire'},
        'product_brand':{'required'  :'La marque est neccessaire'},
        'product_condition':{'required'  :'L\'etat du produit est neccessaire'},
        'product_warehouse':{},
        'product_disponibility':{'required'  :'La disponibilité est neccessaire'},
        'product_description':{},
        'product_date':{'required'  :'La date de mise en vente est neccessaire'},
        'product_technical_data':{},
        'product_pack_only':{'required'  :'Vous devez préciser si le produit est reservé à un pack'},
        'product_pack':{'required'  :'Vous devez préciser si c\'est le produit est pack'},
        'ts_width':{'required'  :'La taille est neccessaire','pattern':'La taille doit être numerique'},
        'ts_height':{'required'  :'La hauteur est neccessaire','pattern':'La hauteur doit être numerique'},
        'ts_length':{'required'  :'La longueur est neccessaire','pattern':'La longueur doit être numerique'},
        'ts_weight':{'required'  :'Le poid est neccessaire','pattern':'Le poid doit être numerique'}
      }
  
    
    // Field permettant de gerer les inputs -----------------------------------------------------------------------
    this.simpleInput = [{name:'product_ref',display:'Référence *',focus:false,placeholder:"Entrer une référence"},
              {name:'product_name',display:'Nom *',focus:false,placeholder:"Entrer un nom"},
              {name:'product_price_htva',display:'Prix *',focus:false,placeholder:"Entrer un prix hors tva"},
              {name:'product_keyword',display:'Mot clés',focus:false,placeholder:"Entrer des mots clés "}];

    this.listInput = [  {name:'product_cat',display:'Catégorie *',data:this.categories.data,focus:false},
              {name:'product_brand',display:'Marque *',data:this.brands.data,focus:false},
              {name:'product_condition',display:'Etat *',data:this.conditions.data,focus:false},
              {name:'product_warehouse',display:'Entrepôt',data:this.warehouses.data,focus:false},
              {name:'product_disponibility',display:'Disponibilité *',data:this.disponibilities.data,focus:false}
            ];
    // Chargement des differentes listes --------------------------------------------------------------------------
    
    this.SelectProvider.RetrieveCategories()
              .then( (response) => { 
                  this.categories = {loading:false,data:response.data};
                  this.listInput[0].data=this.categories.data;
                  this.loader.loading = this.LoadingComponent();
              },(error)=>{
                  this.categories = {loading:false,data:[]};
                  this.loader.loading = this.LoadingComponent();
              });
    this.SelectProvider.RetrieveBrands()
              .then( (response) => { 
                  this.brands = {loading:false,data:response.data};
                  this.listInput[1].data=this.brands.data;
                  this.loader.loading = this.LoadingComponent();
              },(error)=>{
                  this.brands = {loading:false,data:[]};
                  this.loader.loading = this.LoadingComponent();
              });
    this.SelectProvider.RetrieveConditions()
              .then( (response) => { 
                  this.conditions = {loading:false,data:response.data};
                  this.listInput[2].data=this.conditions.data;
                  this.loader.loading = this.LoadingComponent();
              },(error)=>{
                  this.conditions = {loading:false,data:[]};
                  this.loader.loading = this.LoadingComponent();
              });
    this.SelectProvider.RetrieveWarehouses()
              .then( (response) => { 
                  this.warehouses = {loading:false,data:response.data};
                  this.listInput[3].data=this.warehouses.data;
                  this.loader.loading = this.LoadingComponent();
              },(error)=>{
                  this.warehouses = {loading:false,data:[]};
                  this.loader.loading = this.LoadingComponent();
              });
    this.SelectProvider.RetrieveDisponibilities()
              .then( (response) => { 
                  this.disponibilities = {loading:false,data:response.data};
                  this.listInput[4].data=this.disponibilities.data;
                  this.loader.loading = this.LoadingComponent();
              },(error)=>{
                  this.disponibilities = {loading:false,data:[]};
                  this.loader.loading = this.LoadingComponent();
              });

    // Gestion des erreurs -----------------------------------------------------------------------------------------
  }
  protected LoadingComponent():boolean{
   
    return (this.brands.loading || this.categories.loading || this.warehouses.loading || this.disponibilities.loading || this.conditions.loading);
  }
  // Retourne le tableau d'erreur en fonction de la key --
  public GetErrors(key){
    return this.errors[key];
  }
  protected OnValueChanged(data?: any) {
    if (!this.form) { return; }
    const form = this.form;
    for (const field in this.errors) {
      // clear previous error message
      this.errors[field] = [];
      this.form[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.messages[field];
        for (const key in control.errors) {
          this.errors[field].push(messages[key]);
        }
      }
    }
  }
  
  public AjouterParam(e){ 
    e.preventDefault();
    this.ts_detail.unshift({paramname:'',value:'',errors:[],paramfocus:false,valuefocus:false})
  }
  public RemoveParam(index){this.ts_detail.splice(index,1);}

  public Valider(e,form){
    e.preventDefault();
    this.error = {error:false,message:""};
    if(form.valid){ 
      form.value.product_technical_data = "";
      for(let i=0;i<this.ts_detail.length;i++){
        if(this.ts_detail[i].paramname.trim().length >0 && this.ts_detail[i].value.trim().length>0){
          form.value.product_technical_data += "["+this.ts_detail[i].paramname+":"+this.ts_detail[i].value+"]";
        }
      }
      switch(this.categorie){
        case 'ajouter': 
          this.loader = {loading:true,message:"Creation du produit en cours"};
          this.ProductProvider.Create(form.value)
                              .then( (retour)=>{  

                                this.loader = {loading:false,message:"Creation du produit en cours"};
                                if(retour.result){
                                  this.success = {success:true,message:retour.message};
                                  console.log(retour);
                                  this.product.id = retour.id;
                                  console.log(this.product);
                                }else{
                                  this.error = {error:true,message:"["+retour.err_code+"]"+retour.err_message};
                                }
                              },
                              (error)=>{this.loader.loadin=false;this.error = {error:true,message:"Une erreur interne et survenue,veuillez recommencer. Si le problème persiste, veuillez contacter le responsable ."}}
                            );
          break;
        case 'editer': 
        this.loader = {loading:true,message:"Mise à jours du produit en cours"};
          let p = new Product();
          p.Set(form.value);
          p.id = this.product.id;
          p.td_id = this.product.td_id;
          p.pictures = "";
          let tmp = this.product.pictures.split(',');
          for(let i=0;i<tmp.length;i++){
            if(this.picturesToDelete.indexOf(tmp[i])==-1){
              p.pictures+=tmp[i]+",";
            }
          }
          p.pictures = (p.pictures.length >0)?p.pictures.substring(0,p.pictures.length -1):"2";
          p.SomePictureToDelete = this.picturesToDelete;
          this.ProductProvider.Update(p.GetFittedForUpdate())
                              .then( (retour)=>{  this.loader.loading=false;
                                                  if(retour.result){
                                                    this.success = {success:true,message:retour.message};
                                                  }else{
                                                    this.error = {error:true,message:"["+retour.err_code+"]"+retour.err_message};
                                                    this.product.id = retour.id;
                                                  }
                                                },
                                      (error)=>{this.loader.loading=false;this.error = {error:true,message:"Une erreur interne et survenue,veuillez recommencer. Si le problème persiste, veuillez contacter le responsable ."}}
                                    );
        break;
        default: console.log("action non reconnue");break;
      }
    }else{
      console.log("no valid");
    }
  }
  RemovePicture(index,picture){
    this.picturesToDelete.push(picture.picture_id);
    this.pictures.splice(index,1);
    console.log(this.picturesToDelete);
  }
  // Navigation 
  BackToList(){
    this.router.navigate(["/dashboard/product"]);
  }
  BackToDetail(){
    this.router.navigate(["/dashboard/product-detail/"+this.product.id]);
  }
  GoToAddPicture(){
    this.router.navigate(["/dashboard/product-picture/"+this.product.id]);
  }
}
