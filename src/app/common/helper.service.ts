import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Signal, computed} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor(
    private toast_controller: ToastController,
    private auth_service: AuthService
  ) { }


  async toast(color:string,message:string){
    const toast = await this.toast_controller.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: color
    });

    await toast.present()
  }

  async handleError(error:any){
    this.toast('danger',error.error.mensagem)
    if([401,403].includes(error.status))
    {
      this.auth_service.kick()
    }
  }

  async handleMessage(data:any){
    this.toast('success',data.mensagem
    )
  }
}
