import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UtilService } from '../util.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  name = '';
  email = '';
  password = '';
  
  constructor(
    private util: UtilService,
    private navCtrl: NavController,
    private dataService: DataService) { }

  register() {
    this.dataService.register(this.email, this.password).subscribe(
      response => {
        console.log('Sign up successful', response);
        this.dataService.saveUserData(response.localId, this.name).subscribe(res1 => {
            window.location.href = '/login'
            //this.navCtrl.navigateRoot('/home', { animationDirection: 'forward' });
        });
      },
      error => {
        alert('Neuspesna registracija. Proverite unete podatke.')
      });
  }

}
