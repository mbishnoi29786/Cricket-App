import { Component } from '@angular/core';
import { ToastrService } from 'src/app/services/toastr.service';
interface messageInterface{
'success':boolean;
'message':string;
}
@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent {
  toastrMessage:messageInterface;
 // toastrMessage={'success':false,'message':'message/toastrMessage'};
  display=false;
  constructor(private toastr:ToastrService){
    this.toastr.notify.subscribe((response:any)=>{
        // this.toastrMessage={'success':true,'message':response}
        this.toastrMessage=response;
        this.display=true;
        setTimeout(()=>{this.display=false},2000)
    })
  }
}
