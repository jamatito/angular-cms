import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from './global';
import {ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class IdentityGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  canActivate() {
    let identity = this.userService.getIdentity();
    if (identity) {
      return true;
    } else {
      this.router.navigate(['/inicio']);
      return false;
    }
  }

}
