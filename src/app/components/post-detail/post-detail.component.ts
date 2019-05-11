import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {global} from '../../services/global';
import {Comment} from '../../models/comment';
import {NgForm} from '@angular/forms';
import {User} from '../../models/user';
import {CommentService} from '../../services/comment.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, SocialUser, AuthService} from 'ng4-social-login';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {

  public post;
  public comments;
  public identity;
  public token;
  public url;
  public comment: Comment;
  public commented: boolean;
  public user: any = SocialUser;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private socialAuthService: AuthService
  ) {
    this.identity = userService.getIdentity();
    this.token = userService.getToken();
    this.url = global.url;
    this.comment = new Comment(0, '', 0, 0, true);
    this.commented = false;
  }

  ngOnInit() {
    this.getPost();
    this.getCommentByPost();
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

  getCommentByPost() {
    this.route.params.subscribe(
      params => {
        let id = +params['id'];
        // console.log(id);
        this.commentService.getCommentByPost(id).subscribe(
          response => {
            if (response.status == 'success') {
              this.comments = response.comments;
              console.log(this.comments);
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

    this.commentService.create(this.token, this.comment).subscribe(
      response => {
        if (response.status == 'success') {
          // this.status = response.status;
        } else {
          // this.status = 'error';
        }

      }, error => {
        console.log(<any> error);
        // this.status = 'error';
      }
    );
  }

  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
     // this.user = userData;
      console.log(userData);
    });
  }
}
