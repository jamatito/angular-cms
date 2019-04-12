import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {global} from '../../services/global';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {

  public pageTitle: string;
  public identity;
  public token;
  public category: Category;
  public status: string;

  constructor(private userService: UserService, private categoryService: CategoryService,
              private router: Router, private route: ActivatedRoute) {
    this.pageTitle = 'Crear nueva categoría';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.category = new Category(0, '');
  }

  ngOnInit() {
  }


  onSubmit(form) {
    console.log(this.token);
    console.log(this.category);
    this.categoryService.create(this.token, this.category).subscribe(
      response => {
        if (response.status == 'success') {
          this.category = response.category;
          this.status = response.status;
          this.router.navigate(['inicio']);
        } else {
          this.status = 'error';
        }

      }, error => {
        console.log(error as any);
        this.status = 'error';
      }
    );
    // console.log(this.user);
  }

}
