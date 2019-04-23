import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {global} from '../../services/global';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService, UserService, PostService]
})
export class CategoryDetailComponent implements OnInit {

  public pageTitle: string;
  public url: string;
  public category;
  public posts;
  public identity;
  public token;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private userService: UserService,
    private postService: PostService
  ) {
    this.url = global.url;
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit() {
    this.getPostByCategory();
  }

  deletePost(id) {
    this.postService.delete(id, this.token).subscribe(
      response => {
        if (response.status == 'success') {
          this.getPost();
          this.router.navigate(['/inicio']);
        }
      }, error => {
        console.log(<any> error);
        this.router.navigate(['/inicio']);
      }
    );
  }

  getPost() {
    this.postService.getPost().subscribe(
      response => {
        if (response.status == 'success') {
          this.posts = response.posts;
          console.log(this.posts);
        }
      }, error => {
        console.log(<any> error);
      }
    );
  }

  getPostByCategory() {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        // console.log(id);
        this.categoryService.getCategory(id).subscribe(
          response => {
            if (response.status == 'success') {
              this.category = response.category;
              this.categoryService.getPostByCategory(this.category.id).subscribe(
                response => {
                  if (response.status == 'success') {
                    this.posts = response.posts;
                  }
                }, error => {
                  console.log(<any> error);
                  this.router.navigate(['/inicio']);
                }
              );
            }
          }, error => {
            console.log(<any> error);
            this.router.navigate(['/inicio']);
          }
        );
      });
  }

}
