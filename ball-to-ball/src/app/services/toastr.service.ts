import { EventEmitter, Injectable } from "@angular/core";
@Injectable({
    providedIn:'root'
})
export class ToastrService {
    notify :EventEmitter<{success:boolean,message:string}>=new EventEmitter<{success:boolean,message:string}>();
    emitError(message:string) {

        this.notify.emit({success:false,message:message})
    }
    emitSuccess(message:string) {
        this.notify.emit({success:true,message:message})
    }
}
