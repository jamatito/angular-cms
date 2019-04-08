import {Component, OnInit, DoCheck} from '@angular/core';
import {UserService} from './services/user.service';
import {User} from './models/user';
import {global} from './services/global';
import {CategoryService} from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Blog de Angular';
  public identity;
  public token;
  public url;
  public categories;

  constructor(private userService: UserService, private categoryService: CategoryService) {
    this.loadUser();
    this.url = global.url;

  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
          console.log(this.categories);
        }
      }, error => {
        console.log(<any> error);
      }
    );
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  ngDoCheck(): void {
    this.loadUser();
  }

  loadUser() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }
}




