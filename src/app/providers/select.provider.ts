import { Injectable, Inject } from "@angular/core";
import {Router} from "@angular/router";
import { Observable }     from 'rxjs/Observable'
import { Http, Response } from "@angular/http";
import { Api } from "./api.config";
import { User } from "../objets/user";
@Injectable()

export class SelectProvider{
	protected token : string;
	protected user : User=null;
	protected logged : boolean =false;
	constructor (protected router : Router,@Inject(Http) public http:Http,@Inject(Api) public api:Api){
	}
	public RetrieveCategories(){
		return this.http.get(this.api.GetUrl()+'categories/'+this.api.GetToken()).toPromise().then(
                response => {
                    let data = response.json();
                    return data;
                },
                err => {
                      return {result:false,message:err};
                }
          );  
	}
	public RetrieveConditions(){
		return this.http.get(this.api.GetUrl()+'conditions/'+this.api.GetToken()).toPromise().then(
                response => {
                    let data = response.json();
                    return data;
                },
                err => {
                      return {result:false,message:err};
                }
          );  
	}
	public RetrieveBrands(){
		return this.http.get(this.api.GetUrl()+'brands/'+this.api.GetToken()).toPromise().then(
                response => {
                    let data = response.json();
                    return data;
                },
                err => {
                      return {result:false,message:err};
                }
          );  
	}
	public RetrieveWarehouses(){
		return this.http.get(this.api.GetUrl()+'warehouses/'+this.api.GetToken()).toPromise().then(
                response => {
                    let data = response.json();
                    return data;
                },
                err => {
                      return {result:false,message:err};
                }
          );  
	}
	public RetrieveDisponibilities(){
		return this.http.get(this.api.GetUrl()+'disponibilities/'+this.api.GetToken()).toPromise().then(
                response => {
                    let data = response.json();
                    return data;
                },
                err => {
                      return {result:false,message:err};
                }
          );  
	}
}