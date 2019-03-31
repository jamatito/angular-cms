import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {__param} from 'tslib';

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

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.pageTitle = 'Iniciar Sesión';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit() {
    this.logout(); /*Se ejecuta simpre pero solo se cierra cuando le llega el parametro sure por la url*/
  }

  onSubmit(form) {
    this.userService.singnup(this.user).subscribe(
      response => {
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;
          this.userService.singnup(this.user, true).subscribe(
            response => {
              this.identity = response;
              console.log(this.identity);
              console.log(this.token);
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              // form.reset();
              this.router.navigate(['inicio']);
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

  logout() {
    this.route.params.subscribe(params => {
      let logout = +params['sure'];
      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;

        this.router.navigate(['inicio']);
      }
    });
  }

}
