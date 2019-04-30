import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {global} from '../../services/global';
import {Comment} from '../../models/comment';
import {NgForm} from '@angular/forms';
import {User} from '../../models/user';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {

  public post;
  public identity;
  public url;
  public comment: Comment;
  public commented: boolean;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.identity = userService.getIdentity();
    this.url = global.url;
    this.comment = new Comment(0, '', 0, 0, false);
    this.commented = false;
  }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        // console.log(id);
        this.postService.showPost(id).subscribe(
          response => {
            if (response.status == 'success') {
              this.post = response.post;
              // console.log(this.post);
            }
          }, error => {
            console.log(<any> error);
            this.router.navigate(['/inicio']);

          }
        );
      });
  }

  onSubmit(form) {
    this.commented = true;
    this.comment.user_id = this.identity.sub;
    this.comment.post_id = this.post.id;
    console.log(this.comment);
    /*   this.userService.register(this.user).subscribe(
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
       );*/
  }
}
