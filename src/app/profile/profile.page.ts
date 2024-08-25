import { Component, OnInit } from '@angular/core';
import { DataService, IFirebaseProfile } from '../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  name = '';
  address = '';
  userId = ';';

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(resUsers => {
      const users: any[] = []
      Object.keys(resUsers).forEach(key => {
        const firebaseOrder : IFirebaseProfile = {
          key,
          profile:resUsers[key]
        }
        users.push(firebaseOrder);
      });

      console.log(users)
      const user = users.find(x => x.profile.userId === this.data.getUserID());
      console.log(user)
      this.name = user.profile.name;
      this.address = user.profile.address;
      this.userId = user.key;
    });

  }

  save() {
   this.data.updateProfile(this.userId ,this.name, this.address).subscribe(
    response => {
      alert('Uspesno sacuvano')
    })
  };

}
