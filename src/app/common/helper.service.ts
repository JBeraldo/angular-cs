import { Injectable} from '@angular/core';
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
    this.toast('danger',error.mensagem)
    if([401,403].includes(error.status))
    {
      this.auth_service.kick()
    }
  }

  async handleMessage(data:any){
    this.toast('success',data.mensagem)
  }
}
