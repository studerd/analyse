import { Injectable, Inject } from "@angular/core";
import { Http, Response } from "@angular/http";
@Injectable()
export class Api{
    
    private url : string = "http://api.analyse.loc/";
    //private url : string = "http://analyseapi.studerd.be/";
    private token:string = null;
    constructor(@Inject(Http) public http:Http) {     
    }
    public SetToken(token){this.token = token;}
    public GetToken(){return this.token;}
    public GetUrl():string{ return this.url;}
    public SetUrl(url){ this.url = url;}
}