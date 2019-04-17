import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../models/post';
import {global} from '../../services/global';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {
  public identity;
  public token;
  public post: Post;
  public froalaOptions;
  public categories;
  public afuConfig;
  public status: string;
  public pageTitle;
  public isEdit;
  public url: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private categoryService: CategoryService,
    private postService: PostService
  ) {
    this.pageTitle = 'Editar una entrada';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.populateFileUploader();
    this.isEdit = true;
    this.url = global.url;
  }

  ngOnInit() {
    this.post = new Post(1, this.identity.sub, 1, '', '', '', null, null);
    this.loadCategories();
    this.getPost();
  }


  private populateFileUploader() {
    this.afuConfig = {
      multiple: false,
      formatsAllowed: '.jpg,.png',
      maxSize: '50',
      uploadAPI: {
        url: global.url + 'post/upload',
        headers: {
          'Authorization': this.userService.getToken()
        }
      },
      theme: 'attachPin',
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      attachPinText: 'Sube tu imagen',
    };
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
              if (this.post.user_id != this.identity.sub) {
                this.router.navigate(['/inicio']);
              }

            }
          }, error => {
            console.log(<any> error);
            this.router.navigate(['/inicio']);

          }
        );
      });
  }


  loadCategories() {
    this.categoryService.getCategories().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
          // console.log(this.categories);
        }
      }, error => {
        console.log(<any> error);
      }
    );
  }

  imageUpload(data) {
    let uploadData = JSON.parse(data.response);
    this.post.image = uploadData.image;
    console.log(this.post);
  }

  onSubmit(form) {
    this.postService.update(this.post, this.post.id, this.token).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = response.status;
          this.router.navigate(['/entrada/', this.post.id]);
        } else {
          this.status = 'error';
        }

      }, error => {
        console.log(error as any);
        this.status = 'error';
      }
    );
  }
}
