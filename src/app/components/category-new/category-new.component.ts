import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {global} from '../../services/global';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Category} from '../../models/category';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService]
})
export class CategoryNewComponent implements OnInit {

  public pageTitle: string;
  public identity;
  public token;
  public category: Category;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {

    this.pageTitle = 'Crear nueva categoría';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.category = new Category(0, '');
  }

  ngOnInit() {
  }

}
