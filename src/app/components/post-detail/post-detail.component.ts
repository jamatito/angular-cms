import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {

  public post;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
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

}
