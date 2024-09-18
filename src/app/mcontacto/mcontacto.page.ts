import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mcontacto',
  templateUrl: './mcontacto.page.html',
  styleUrls: ['./mcontacto.page.scss'],
})
export class McontactoPage implements OnInit {
datos:any=[];
cod_contacto: string="";
txt_nombre:string="";
txt_apellido:string="";
txt_telefono:string="";
txt_email:string="";

  constructor(public navCtrl: NavController, public servicio: AccesoService) { 
    this.servicio.getSession("cod_contacto").then((res:any)=>{
      this.cod_contacto=res;
      //funcion para llamar datos
      this.cargar_datos();
    });
  }

  ngOnInit() {
  }
  cargar_datos(){
    let datos={
      accion: "dcontacto",
      cod_contacto:this.cod_contacto
    };
    this.servicio.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        datos=res.datos;
        this.txt_nombre=res.datos.nombre;
        this.txt_apellido=res.datos.apellido;
        this.txt_telefono=res.datos.telefono;
        this.txt_email=res.datos.email;

      }else{
        this.servicio.showToast(res.mensaje);
      }
    });
  }

  actualizar(){
    
    this.navCtrl.navigateRoot('/contactos');
  }
  cancelar(){
    this.navCtrl.navigateRoot('/contactos');
  }
}
