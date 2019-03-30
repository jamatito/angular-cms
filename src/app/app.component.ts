import {Component, OnInit, DoCheck} from '@angular/core';
import {UserService} from './services/user.service';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Blog de Angular';
  public identity;
  public token;

  constructor(private userService: UserService) {
    this.loadUser();
  }

  ngOnInit(): void {
    console.log('Web cargada correctamente');
  }

  ngDoCheck(): void {
   this.loadUser();
  }

  loadUser() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }
}




