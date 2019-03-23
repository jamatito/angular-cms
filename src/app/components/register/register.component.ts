import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public pageTitle: string;
  public user: User;

  constructor(private userService: UserService) {
    this.pageTitle = 'Registrarse';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    /*      public id: number,
      public name: string,
      public surname: string,
      public role: string,
      public email: string,
      public password: string,
      public description: string,
      public image: string*/

  }

  ngOnInit() {
    console.log(this.userService.test());
  }

  onSubmit(form) {
    this.userService.register(this.user).subscribe(
      response => {
        console.log(response);
        form.reset();
      }, error => {
        console.log(<any> error);
      }
    );
    // console.log(this.user);

  }

}
