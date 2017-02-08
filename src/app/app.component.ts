import { Component, Inject } from '@angular/core';
import { AuthProvider }  from './providers/auth.provider';
import {Router,ActivatedRoute} from "@angular/router";
import {User} from "./objets/user";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent  { 
	user: User;
	loadData = null;
	constructor(private route:ActivatedRoute,protected router : Router,@Inject(AuthProvider) public AuthProvider:AuthProvider){

	}

}
