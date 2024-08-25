import { Component } from '@angular/core';
import { StatusBarInfo } from '@capacitor/status-bar';
import { MenuController, Platform } from '@ionic/angular';
import { UtilService } from './util.service';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public isMenuEnabled:boolean = true;
  public selectedIndex = 0;
  role = ''

  constructor(
    private platform: Platform,
    private util: UtilService,
    private data: DataService,
    private router: Router,
    private menuController: MenuController
  ) {
    
  }

  ngOnInit() {
    this.selectedIndex = 1;
    
    this.util.getMenuState().subscribe(menuState => {
      this.isMenuEnabled = menuState;
    });

    this.role = this.data.getRole()!;
    console.log(this.role)
  }

  navigate(path:any, selectedId:any) {
    this.selectedIndex = selectedId;
    this.router.navigate([path]);
  }

  close() {
    this.menuController.toggle();
  }

  logout() {
    this.data.logout();
    this.router.navigateByUrl('/welcome')
  }
}
