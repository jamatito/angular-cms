import {Component, OnInit} from '@angular/core';
import {global} from '../../services/global';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {
  public pageTitle: string;
  public url: string;
  public posts;
  public identity;
  public token;

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {
    this.pageTitle = 'Inicio';
    this.url = global.url;
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  ngOnInit() {
    this.getPost();
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

}
