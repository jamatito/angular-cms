import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {global} from '../../services/global';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {identity} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [CategoryService, UserService, PostService]
})
export class ProfileComponent implements OnInit {

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
    this.getPostByUser();
  }


  deletePost(id) {
    this.postService.delete(id, this.token).subscribe(
      response => {
        if (response.status == 'success') {
          this.getPost();
        }
      }, error => {
        console.log(<any> error);
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

  getPostByUser() {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        // console.log(id);
        this.userService.getPostByUser(id).subscribe(
          response => {
            if (response.status == 'success') {
              this.posts = response.posts;
            }
          }, error => {
            console.log(<any> error);
            this.router.navigate(['/inicio']);
          }
        );
      });
  }


}



