import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from './toastr.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }
  key = '4v0wFM10&XZ7'
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token')
    if (token != null) {

      req = req.clone({
        headers: req.headers.set('authToken', token)
      })
    }
    if (req.method == "POST" || req.method == "PUT" || req.method == "PATCH") {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(req.body), this.key);
      const encryption = encrypted.toString();

      const newData = { payload: encryption }
     
      return next.handle(req.clone({ body: newData }))
        .pipe(map((res: any) => {
          if(res.type!==0){
            console.log(res.body?.message)
        
          this.toastr.emitSuccess(res.body?.message)
          
          }
         
          return res;
        }),
          catchError((error: HttpErrorResponse) => {
          
            this.toastr.emitError(error.error?.error)
            return throwError(error);
          }))
    }
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.message){
            if(error.message.length>15){
          this.toastr.emitError(error?.name)
            }
            else {
              this.toastr.emitError(error?.message)
            }
          }
          else{
            this.toastr.emitError("")
          }
          return throwError(error);
        }))


  }
}