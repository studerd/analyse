import { Injectable, Inject } from "@angular/core";
import {Router} from "@angular/router";
import { Observable }     from 'rxjs/Observable'
import { Http, Response,Headers,RequestOptions } from "@angular/http";
import { Api } from "./api.config";
@Injectable()

export class ProductProvider{
	constructor (protected router : Router,@Inject(Http) public http:Http,@Inject(Api) public api:Api){
	}

	public Retrieve(pageCourrante,nbElement){
		let param =(pageCourrante!=null)?"/"+pageCourrante:"";
		param+=(pageCourrante!=null && nbElement!=null)?"/"+nbElement:"";
		return this.http.get(this.api.GetUrl()+'products/'+this.api.GetToken()+param).toPromise().then(
                response => {
                    let data = response.json();
                    return data;
                },
                err => {
                      return {result:false,message:err};
                }
          );  
	}
  public Detail(id){
    return this.http.get(this.api.GetUrl()+'product/'+this.api.GetToken()+"/"+id).toPromise().then(
                response => {
                    let data = response.json();
                    return data;
                },
                err => {
                      return {result:false,message:err};
                }
          );  
  }
	public Create(data){

    let headers = new Headers({ 'content-type':'application/json;charset=utf-8'});
    let options = new RequestOptions({headers:headers});
		return this.http.post(this.api.GetUrl()+'product/'+this.api.GetToken(),data,options).toPromise().then(
                response => {
                    let data = response.json();
                    return data;
                },
                err => {
                      return {result:false,message:err};
                }
          );  
	}

  public UploadPicture(params: Array<string>, files: Array<File>){
      var formData: any = new FormData();
      for(var i = 0; i < files.length; i++) {
          formData.append("file[]", files[i], files[i].name);
      }
      return this.http.post(this.api.GetUrl()+'product-picture/'+this.api.GetToken(),formData).toPromise().then(
                response => {
                    let data = response.json();
                    console.log(data);
                    return data;
                },
                err => {
                      return {result:false,message:err};
                }
          );  
  }
	public Delete(id){
    return this.http.delete(this.api.GetUrl()+'product/'+this.api.GetToken()+"/"+id).toPromise().then(
                response => {
                    let data = response.json();
                    return data;
                },
                err => {
                      return {result:false,message:err};
                }
          );  
	}
	public Update(data){
    let headers = new Headers({ 'content-type':'application/json;charset=utf-8'});
    let options = new RequestOptions({headers:headers});
    console.log(data);
    return this.http.put(this.api.GetUrl()+'product/'+this.api.GetToken(),data,options).toPromise().then(
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