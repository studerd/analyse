import { Component,NgModule } from '@angular/core';
import {Router} from "@angular/router";
import 'gsap';
declare var Circ:any;
declare var TimelineMax:any;
import {AuthProvider} from '../../providers/auth.provider';
import { Inject } from "@angular/core";
@Component({
  templateUrl: './login.template.html',
  styleUrls :['./login.style.css']
})


export class LoginComponent  { 
	identifiant : string = null;
	password: string =null;
	user    ={show:false,name:'',mail:'',avatar:"default.jpg",accesstype:'UNKNOWN'};
	loading = false;
	info = null;
	inputidentifiant = true;
	inputpassword = true;
	animationAvatarSmallHidden :any = null;
	constructor(protected router : Router,@Inject(AuthProvider) public AuthProvider:AuthProvider){
		console.log(localStorage.getItem("AnalyseERPToken"));
		if(localStorage.getItem("AnalyseERPToken") !=null){
			if(this.AuthProvider.IsLogged()){
				let user = this.AuthProvider.GetUser();
				this.user = {show:true,name:user.nom,mail:user.email,avatar:user.avatar,accesstype:user.accesstype}
			}else{
				this.AuthProvider.GetToken().then(
					response	=>	
							{	
								let data = response.json();
								console.log(data);
								if(data.result){
									this.AnimeAvatar(data.data);
									console.log(this.user);
									this.AuthProvider.SetUser(data.data);
									this.AuthProvider.Logged();
								}else{
									localStorage.removeItem("AnalyseERPToken");
								}
							},
					error		=>	
						{ 
							console.log(error.text());
							localStorage.removeItem("AnalyseERPToken");
							this.router.navigate(["/login"]);
						}
				);
			}
		}
	}
	// Cette methode permet de faire des actions une fois que les composants sont chargés.
	// Le constructeur se lancant avant le chargement complet de la dom , il vaut mieux utiliser cette methode pour par exemple ecrire les animations qui utilisent les elements html
	ngAfterContentInit() {
		//On minifie directement l'avatar
		var tlm =   new TimelineMax();
        	tlm.to(document.getElementById("pictureclient"),0,{scale:0.1,autoAlpha:0});
		
	}
	// Permet de recuperer l'avatar du client et ca permet de savoir aussi si l'user entré existe.
	GetAvatar(e){
		e.preventDefault();
		if(!this.loading){
			if(this.identifiant != null && this.identifiant.length >0){
				this.loading = true;
				this.AuthProvider.GetInformation(this.identifiant)
					.then(
						response	=>	
							{	
								let data = response.json();
								if(data.result){
									this.inputidentifiant = true;
									this.AnimeAvatar(data);
								}else{
									this.inputidentifiant = false;
								}
								this.loading = false;
							},
						error		=>	
							{ 
								console.log(error.text());
								this.loading = false;
							}
					);
			}
		}
	}
	//permet de recuperer les crédentials du client ---------------------------------------------------------------------
	GetCredential(e){
		e.preventDefault();
		if(!this.loading){
			if(this.password != null && this.password.length >0){
				this.loading = true;
				this.AuthProvider.Authentication(this.identifiant,this.password)
					.then(
						response	=>	
								{	
									console.log(response);
									let data = response.json();
									console.log(data);
									if(data.result){
										this.inputpassword = true;
										localStorage.setItem('AnalyseERPToken',data.token);
										this.AuthProvider.SetTokenInAPI(localStorage.getItem("AnalyseERPToken"));
										this.AuthProvider.SetUser(data.data);
										this.AuthProvider.Logged();
										this.Navigate();
									}else{
										this.inputpassword = false;
									}
								},
						error		=>	
							{ 
								console.log(error.text());
								this.inputpassword = false;
							}
					);
				this.loading = false;
			}
		}
	}
	protected Navigate(){
		console.log(this.user);
		switch(this.user.accesstype){
			case "PROGRAMMER":
				this.router.navigate(["/dashboard"]);
				break;

		}
	}
	// Animation --------------------------------------------------------------------------------------------------------
	protected AnimeAvatar(picture){
		var tlm =   new TimelineMax({ onComplete: this.changeValueUser(picture) });
        	tlm.to(document.getElementsByClassName("iconavatar"),0.3, {scale:0.1,autoAlpha:0,ease:Circ.easeInOut});
	}
	protected AnimeAvatarReverse(){
		var tlm =   new TimelineMax({ onComplete: this.changeValueUserReverse() });
        	tlm.to(document.getElementsByClassName("iconavatar"),0.3, {scale:0.1,autoAlpha:0,ease:Circ.easeInOut});
	}
	changeValueUser(picture){
           	this.user={show:true,name:picture.prenom+" "+picture.nom,mail:picture.email,avatar:picture.avatar,accesstype:picture.accesstype};
            var t = new TimelineMax();
            t.to(document.getElementById("pictureclient"),0.2, {scale:1,autoAlpha:1,ease:Circ.easeInOut,onComplete:function(){
            	var tt = new TimelineMax();
            		tt.to(document.getElementById("partgo"),0.1, {autoAlpha:0,ease:Circ.easeInOut})
            		tt.to(document.getElementById("mdppart"),0.2, {left:"-=360px",ease:Circ.easeInOut});
            }},"+=.4");
	}
	changeValueUserReverse(){
		this.identifiant = null;
		this.user    ={show:false,name:'',mail:'',avatar:"default.jpg",accesstype:"UNKNOWN"};
		var t = new TimelineMax();
            t.to(document.getElementById("mdppart"),0.2, {left:"+=360px",ease:Circ.easeInOut,onComplete:function(){
            	var tt = new TimelineMax();
            		tt.to(document.getElementById("defaultavatar"),0.2, {scale:1,autoAlpha:1})
            		tt.to(document.getElementById("partgo"),0.2, {autoAlpha:1,ease:Circ.easeInOut});	
            }},"+=.2");
	}
}
