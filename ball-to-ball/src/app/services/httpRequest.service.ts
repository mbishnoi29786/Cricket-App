import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { url } from "src/Enviroment/enviroment";

@Injectable()

export class HttpRequest {

    constructor(private http:HttpClient){}
    getRequest(api: string , query:any) {
        return this.http.get(`${url}${api}`, { params: query });
    }
    postRequest(api:string ,data : object) {
        return this.http.post(`${url}${api}`, data)
    }
}