import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public pageTitle: string;
  public user: User;
  public status: string;
  public token;
  public identity;

  constructor(private userService: UserService) {
    this.pageTitle = 'Editar perfil';
    // this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.user = this.identity;

    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email, '',
      this.identity.description,
      this.identity.image);

  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.userService.update(this.user, this.token).subscribe(
      response => {
        /* if (response.status != 'error') {
           this.status = 'success';
           this.token = response;
         } else {
           this.status = 'error';
         }*/
        console.log(response);
      }, error => {
        console.log(<any> error);
        this.status = 'error';
      }
    );
  }

}
