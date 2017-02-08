export class Product {
	id:number;
	date:string;
	name:string;
	description:string;
	technical_data:any[];
	price_htva:any;
	ref:string;
	condition:{id:any,name:string};
	warehouse:{id:any,name:string};
	category:{id:any,name:string};
	disponibility:{id:any,name:string};
	brand:{id:any,name:string};
	keyword:string;
	pack_only:number;
	pack:number;
	td_id:number;
	height:number;
	length:number;
	width:number;
	weight:number;
	pictures;
	picturesArr;
	SomePictureToDelete;
	constructor(){
		this.id = 0;
		this.date="";
		this.name="";
		this.description="";
		this.technical_data=[{paramname:'',value:'',errors:[],paramfocus:false,valuefocus:false}];
		this.price_htva="";
		this.ref="";
		this.category={id:1,name:"UNKNOWN"};
		this.warehouse={id:"",name:""};
		this.condition={id:"",name:""};
		this.disponibility={id:"",name:""};
		this.brand={id:"",name:""};
		this.keyword="";
		this.pack_only=0;
		this.pack=0;
		this.td_id=0;
		this.height=0;
		this.length=0;
		this.width=0;
		this.weight=0;
		this.pictures="";
		this.picturesArr=[];
		this.SomePictureToDelete = null;
	}
	public Set(data){
		this.id = data.product_id;
		this.date=data.product_date;
		this.name=data.product_name;
		this.description=data.product_description;
		this.technical_data=this.GenerateTechnicalData(data.product_technical_data);
		this.price_htva=data.product_price_htva;
		this.ref=data.product_ref;
		this.condition={id:data.product_condition,name:data.conditions_name};
		this.warehouse={id:data.product_warehouse,name:data.warehouse_name};
		this.category={id:data.product_cat,name:data.category_name};
		this.disponibility={id:data.product_disponibility,name:data.disponibility_name};
		this.brand={id:data.product_brand,name:data.brand_name};
		this.keyword=data.product_keyword;
		this.pack_only=data.product_pack_only;
		this.pack=data.product_pack;
		this.td_id=data.product_td_id;
		this.height=data.ts_height;
		this.length=data.ts_length;
		this.width=data.ts_width;
		this.weight=data.ts_weight;
		this.pictures=data.product_pictures;
		this.picturesArr=data.pictures;
	}
	public GetFittedForUpdate(){
		return {	product_id:this.id,
					product_date:this.date,
					product_name:this.name,
					product_description:this.description,
					product_technical_data:this.StringifyTechnicalData(this.technical_data),
					product_price_htva:this.price_htva,
					product_ref:this.ref,
					product_condition:this.condition.id,
					product_warehouse:this.warehouse.id,
					product_cat:this.category.id,
					product_disponibility:this.disponibility.id,
					product_brand:this.brand.id,
					product_keyword:this.keyword,
					product_pack_only:this.pack_only,
					product_pack:this.pack,
					product_td_id:this.td_id,
					ts_height:this.height,
					ts_length:this.length,
					ts_width:this.width,
					ts_weight:this.weight,
					product_pictures:this.pictures,
					SomePictureToDelete:this.SomePictureToDelete}
	}
	protected GenerateTechnicalData(data){
		let retour =[];
		let arr = data.split(']');
		this.technical_data = [];
		for(let i=0;i<arr.length;i++){
			let elem = arr[i].replace('[','').split(':');
			if(elem[0].trim().length >0 && elem[1].trim().length>0){
				retour.push({paramname:elem[0],value:elem[1],errors:[],paramfocus:false,valuefocus:false})
			}
		}
		return retour;
	}
	protected StringifyTechnicalData(data){
		let str ="";
		for(let i=0;i<data.length;i++){
			str+="["+data[i].paramname+":"+data[i].value+"]";	
		}	
		return str;
	}

	public Affiche(elem){
		let retour :any="";
		switch(elem){
			case 'id': retour= this.id;break;
			case 'date' :retour = this.date; break;
			case 'name' :retour = this.name; break;
			case 'description' :retour = this.description; break;
			case 'technical_data':retour = this.technical_data; break;
			case 'price_htva' :retour = this.price_htva; break;
			case 'ref' :retour = this.ref; break;
			case 'condition': retour = this.condition.name; break;
			case 'warehouse': retour = this.warehouse.name; break;
			case 'category': retour = this.category.name; break;
			case 'disponibility': retour = this.disponibility.name; break;
			case 'brand': retour = this.brand.name; break;
			case 'keyword' :retour = this.keyword; break;
			case 'pack_only' :retour = (this.pack_only==0)? "Non":"Oui"; break;
			case 'pack' :retour = this.pack; break;
			case 'td_id' :retour = this.td_id; break;
			case 'height' :retour = this.height; break;
			case 'length' :retour = this.length; break;
			case 'width' :retour = this.width; break;
			case 'weight' :retour = this.weight; break;
			case 'pictures' :retour = this.pictures; break;
			case 'picturesArr' :retour = this.picturesArr; break;
		}
		return retour;
	}

}