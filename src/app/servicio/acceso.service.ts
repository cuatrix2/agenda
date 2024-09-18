import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
@Injectable({
  providedIn: 'root'
})
export class AccesoService {
server: string= "http://localhost/Ws_Agenda2024/ws_agenda.php"
  constructor(public http: HttpClient, public toastCtrl: ToastController) 
  { 
  }
  postData(body:any)
  {
    let head= new HttpHeaders({'Content-Type':'application/json, charset:utf8'});
    let options= {headers:head }
    return this.http.post(this.server, JSON.stringify(body),options);
  }
async showToast(mensaje: string)
 {
  const toast = await this.toastCtrl.create({
    message: mensaje,
    duration: 2000,
    position: 'top',
  });
  toast.present();
}

async createSession(id: string, valor: string) 
{
  await Preferences.set({
    key: id,
    value: valor,
  });
}
  
async getSession(id: string) {
  const item = await Preferences.get({
    key: id,
  });
  return item.value;
}
async closeSession() {
  await Preferences.clear();
}
}
