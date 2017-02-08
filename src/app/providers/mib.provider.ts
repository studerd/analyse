import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from "@angular/router";
import { AuthProvider } from "./auth.provider";

import {Observable} from "rxjs/Observable";
@Injectable()
export class MibProvider implements CanActivate {

	constructor(protected router : Router,@Inject(AuthProvider) public AuthProvider:AuthProvider){}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		return this.AuthProvider.Auth(() => this.router.navigate(['/login']));
	}

}

