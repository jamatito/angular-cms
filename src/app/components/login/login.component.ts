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
  public token;
  public identity;

  constructor(private userService: UserService) {
    this.pageTitle = 'Iniciar Sesión';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.userService.singnup(this.user).subscribe(
      response => {
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;
          form.reset();
          this.userService.singnup(this.user, true).subscribe(
            response => {
              this.identity = response;
              // console.log(this.identity);
              // console.log(this.token);
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
            },
            error => {
              console.log(<any> error);
              this.status = 'error';
            }
          );
        } else {
          this.status = 'error';
        }
      }, error => {
        console.log(<any> error);
        this.status = 'error';
      }
    );
  }
}
