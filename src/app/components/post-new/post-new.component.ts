import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../models/post';
import {global} from '../../services/global';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {
  public pageTitle: string;
  public identity;
  public token;
  public post: Post;
  public froalaOptions;
  public categories;
  public afuConfig;
  public status: string;
  public isEdit;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private categoryService: CategoryService,
    private postService: PostService
  ) {
    this.pageTitle = 'Crear una entrada';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.populateFileUploader();
    this.isEdit = false;

  }

  ngOnInit() {
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    this.loadCategories();
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
    console.log(this.token);
    console.log(this.post);
    this.postService.create(this.token, this.post).subscribe(
      response => {
        if (response.status == 'success') {
          this.post = response.post;
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
  }
}
