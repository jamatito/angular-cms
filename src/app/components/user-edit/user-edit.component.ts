import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {global} from '../../services/global';

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
  public froalaOptions;
  public token;
  public identity;
  public afuConfig;
  public url;

  constructor(private userService: UserService) {
    this.pageTitle = 'Editar perfil';
    // this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.user = this.identity;
    this.loadUser();
    this.populateFileUploader();
    this.url = global.url;

  }

  private populateFileUploader() {
    this.afuConfig = {
      multiple: false,
      formatsAllowed: '.jpg,.png',
      maxSize: '50',
      uploadAPI: {
        url: global.url + 'user/upload',
        headers: {
          'Authorization': this.userService.getToken()
        }
      },
      theme: 'attachPin',
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      attachPinText: 'Sube tu imagen',
    };
  }


  private loadUser() {
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
    console.log(this.user);
    this.userService.update(this.user, this.token).subscribe(
      response => {
        if (response.status != 'error') {
          this.status = 'success';
          // Actualizar usuario en sesión
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        } else {
          this.status = 'error';
        }
        console.log(response);
      }, error => {
        console.log(<any> error);
        this.status = 'error';
      }
    );
  }

  imageUpload($data) {
    let uploadData = JSON.parse($data.response);
    this.user.image = uploadData.image;
    console.log(this.user);
  }

}
