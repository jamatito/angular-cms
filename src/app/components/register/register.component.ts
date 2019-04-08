import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public status: string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.pageTitle = 'Registrarse';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.userService.register(this.user).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status;
          this.router.navigate(['login']);
        } else {
          this.status = 'error';
        }

      }, error => {
        console.log(<any> error);
        this.status = 'error';
      }
    );
    // console.log(this.user);

  }

}
