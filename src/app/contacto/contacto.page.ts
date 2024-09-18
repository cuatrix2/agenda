import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../servicio/acceso.service';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
cod_persona:string="";
txt_nombre:string="";
txt_apellido:string="";
txt_telefono:string="";
txt_email:string="";
mensaje:string=""
  constructor(public navCtrl:NavController, public servicio:AccesoService) { 
    this.servicio.getSession('cod_persona').then((res:any)=>{
      this.cod_persona=res;
    });
  }

  ngOnInit() {
  }

  verificartelefonoemail(){
    let datos={
      "accion":"vtelefono",
      "cod_persona":this.cod_persona,
      "telefono":this.txt_telefono,
      "email":this.txt_email,
    };
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.mensaje=res.mensaje;
      }else{
        this.mensaje=res.mensaje
      }
    });
  }
guardar(){
let datos={
  "accion":"nuevoc",
  "cod_persona":this.cod_persona,
  "nombre":this.txt_nombre,
  "apellido":this.txt_apellido,
  "telefono":this.txt_telefono,
  "email":this.txt_email,

};
this.servicio.postData(datos).subscribe((res:any)=>
{
  if(res.estado==true){
   this.navCtrl.back();

   this.servicio.showToast(res.mensaje);
  }else{
     this.servicio.showToast(res.mensaje);
  }
})

  this.navCtrl.navigateRoot(['/contactos']);
}
cancelar(){
   this.navCtrl.navigateRoot(['/contactos']);
}
}
