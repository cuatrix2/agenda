import { Component } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { ModalController, NavController } from '@ionic/angular';
import { RclavePage } from '../rclave/rclave.page';
import { RegistrarPage } from '../registrar/registrar.page';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  txt_usuario: string = "";
  txt_clave: string = "";
  constructor(public modalCtrl: ModalController, public servicio: AccesoService, public navCrtl: NavController) { }

  loggin() {
    let datos = {
      accion: 'loggin',
      usuario: this.txt_usuario,
      clave: this.txt_clave
    }
    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado == true) {
        this.servicio.createSession('cod_persona', res.persona[0].codigo);
        this.servicio.createSession('nombre_persona', res.persona[0].nombre);
        this.servicio.showToast(res.mensaje);
        this.navCrtl.navigateRoot(['/menu']);
      }
      else {
        this.servicio.showToast(res.mensaje);
      }
    })
  }

  async recuperar() {
    const modal = await this.modalCtrl.create({
      component: RclavePage
    });
    return await modal.present();
  }

  async register() {
    const modal = await this.modalCtrl.create({
      component: RegistrarPage
    });
    return await modal.present();
  }








}
