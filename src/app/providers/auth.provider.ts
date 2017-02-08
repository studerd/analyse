import { Injectable, Inject } from "@angular/core";
import {Router} from "@angular/router";
import { Observable }     from 'rxjs/Observable'
import { Http, Response } from "@angular/http";
import { Api } from "./api.config";
import { User } from "../objets/user";
@Injectable()

export class AuthProvider{
	protected token : string;
	protected user : User=null;
	protected logged : boolean =false;
	constructor (protected router : Router,@Inject(Http) public http:Http,@Inject(Api) public api:Api){
	}
	// Recupere l'utilisateur
	public GetUser():User{ return this.user;}//On set le user ------------------------
	public SetUser(data){
		this.user = new User();
		this.user.Set(data);

	}
	// methode appellée par le systeme MIB CanActivate
	public Auth(fallback): Promise<boolean> {
		this.token = localStorage.getItem("AnalyseERPToken");
		let url =this.api.GetUrl()+'token/'+this.token;
		return this.http.get(this.api.GetUrl()+'token/'+this.token).toPromise()    
                .then(response => {
                				let data = response.json();
		                    	if(data.result){
									this.SetUser(data.data);
									this.user = this.GetUser();
									this.Logged();
									this.api.SetToken(this.token);
									return true;
								}else{
									localStorage.removeItem("AnalyseERPToken");
									this.router.navigate(['/login']);
									return false;
								}})
                .catch(()=> Observable.of(false));
	}
	public Logged(){this.logged = true;}
	public IsLogged():boolean{ return this.logged;}
	
	public GetToken():Promise<Response>{
		this.token = localStorage.getItem("AnalyseERPToken");
		return this.http.get(this.api.GetUrl()+'token/'+this.token).toPromise()
				
	}

	//On se connecte -------------------------------------------------
	Authentication(identifiant,password) : Promise<Response>{
		return this.http.get(this.api.GetUrl()+'authentification/'+identifiant+'/'+password).toPromise()
	}

	// On recupere l'avatar du client ---------------------------------
	GetInformation(identifiant) : Promise<Response> {
		return this.http.get(this.api.GetUrl()+'getuserinfo/'+identifiant).toPromise();
				
	}
	// On set le token dans l'api
	SetTokenInAPI(token){
		this.api.SetToken(token);
	}
	
	LogOut(){
		this.user = null;
		this.logged = false;
		localStorage.removeItem("AnalyseERPToken");
		this.router.navigate(['/login']);
	}
}