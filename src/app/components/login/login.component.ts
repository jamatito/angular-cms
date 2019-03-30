import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public status: string;

  constructor(private userService: UserService) {
    this.pageTitle = 'Iniciar Sesión';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.userService.singnup(this.user).subscribe(
      response => {
        console.log(response);
        /* if (response.status == 'success') {
           this.status = response.status;
           form.reset();
         } else {
           this.status = 'error';
         }*/

      }, error => {
        console.log(<any> error);
        this.status = 'error';
      }
    );
  }

}
