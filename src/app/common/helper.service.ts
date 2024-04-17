import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Signal, computed} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor(private toast_controller: ToastController
  ) { }


  async toast(color:string,message:string){
    const toast = await this.toast_controller.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: color
    });

    await toast.present();
  }
}
