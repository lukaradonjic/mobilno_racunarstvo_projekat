import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilService } from '../util.service';
import { DataService, IProfile } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email = '';
  password = '';

  constructor(
    private util: UtilService,
    private navCtrl: NavController, 
    private dataService: DataService
  ) { }

  login() {
    // Enabling Side Menu
    this.dataService.login(this.email, this.password).subscribe(
      response => {
        this.dataService.getUsers().subscribe(resUsers => {
          const users : IProfile[] = []
          Object.keys(resUsers).forEach(key => {
            const firebaseOrder : IProfile = resUsers[key];
            users.push(firebaseOrder);
          });
          
          const user : IProfile = users.find(x => x.userId === response.localId)!
          this.dataService.saveToken(response.idToken);
          this.dataService.saveRole(user.role);
          this.dataService.saveUserID(response.localId);
          this.util.setMenuState(true);
          window.location.href = '/home'
          //this.navCtrl.navigateRoot('/home', { animationDirection: 'forward' });
        },
        error => {
          alert('Korisnicko ime ili lozinka nisu ispravni')
        });
      },
      error => {
        alert('Korisnicko ime ili lozinka nisu ispravni')
      });
  }

}
