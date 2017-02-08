import { Component,NgModule } from '@angular/core';
import { Router } from '@angular/router';
import 'gsap';
declare var Circ:any;
declare var TimelineMax:any;
import {AuthProvider} from '../../providers/auth.provider';
import { Inject } from "@angular/core";
import {User} from "../../objets/user";
@Component({
  templateUrl: './dashboard.template.html',
  styleUrls :['./dashboard.style.css']
})


export class DashboardComponent  {
	user : User;
	fin : string;
	diff : number;
	menu : any[];
	fulltime :number;
	fullCircle : number;
	classHorloge : string;
	classSecHorloge : string;
	menuUser;
	constructor(protected router : Router,@Inject(AuthProvider) public AuthProvider:AuthProvider){
		this.user = this.AuthProvider.GetUser();
		this.GenerateMenu();
		this.fulltime = 60*60*1000;
		this.fullCircle = 60;
		this.classHorloge = " progress-100";
		this.classSecHorloge = " progress-sec-0";
	}
	LookTheEnd(){
		this.fin = " "+Math.floor(this.diff/60000)+" min "+("0" + Math.floor(Math.floor(this.diff%60000)/1000)).slice(-2)+" sec";
		this.diff-=1000;
		this.classHorloge = Math.floor(this.diff/this.fulltime*100)+"%";

		if(this.diff <= 0){
			this.LogOut();
		}
	}
	ngAfterContentInit() {
		if(this.user !=null){
			let date = new Date();
			this.diff = this.user.sessionvalid.getTime()-new Date().getTime();
			setInterval(this.LookTheEnd.bind(this), 1000 );
			this.LookTheEnd();
		}
	}

	LogOut(){
		this.AuthProvider.LogOut();
	}

	protected GenerateMenu(){
		this.menuUser = {show:false,height:"0px"};
		switch(this.user.accesstype){
			case "PROGRAMMER":
				this.menu = [	{	icon:"flaticon-dashboard",title:'Dashboard',link:'/dashboard',
									sousmenu :false
								},
								/*{	icon:"flaticon-login",title:'Employee',link:'/dashboard/employee',
									sousmenu :true,child:{height:"0px",show:false, links:[{title:'Fiche',link:'/fiche'},{title:'Congé',link:'/conge'},{title:'Horaire',link:'/horaire'}]}

								},*/
								{	icon:"flaticon-product",title:'Produits',link:'/dashboard/product',
									sousmenu :false
								},
								/*{	icon:"flaticon-login",title:'Client',link:'/dashboard/client',
									sousmenu :true,child:{height:"0px",show:false, links:[{title:'Fiche',link:'/fiche'},{title:'Congé',link:'/conge'},{title:'Horaire',link:'/horaire'}]}

								}*/
							];
				break;
		}
	}
	public ToggleMenu(){
		if(this.menuUser.show){
			this.menuUser = {show:false,height:"0px"};
		}else{
			this.menuUser = {show:true,height:"50px"};
		}
	}
	protected Navigate(index,link){
		if(this.menu[index].sousmenu){
			this.menu[index].child.show = !this.menu[index].child.show;
			this.menu[index].child.height = (this.menu[index].child.height=="0px")? (this.menu[index].child.links.length*40)+'px' : "0px";
		}
		console.log(link);
		this.router.navigate([link]);
	}

}