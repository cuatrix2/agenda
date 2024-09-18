import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  nombre:string="";
  constructor(public navCtrl: NavController, public servicio: AccesoService) {
  this.servicio.getSession('nombre_persona').then((res:any)=>{
      this.nombre=res;

    });
  }

  ngOnInit() {}

  irperfil() {
    this.navCtrl.navigateForward('/perfil');
  }
  ircontactos() {
    this.navCtrl.navigateForward('/contactos');
  }
}
