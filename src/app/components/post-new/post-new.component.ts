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
  public insert: boolean;

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
    this.populateOptionsFroala();
    this.isEdit = false;
    this.insert = false;

  }

  ngOnInit() {
    this.post = new Post(1, this.identity.sub, 1, '', '', '', null, null);
    this.loadCategories();
    console.log(this.identity);
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

  private populateOptionsFroala() {
    this.froalaOptions = {
      charCounterCount: true,
      toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
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
    // this.router.navigate(['inicio']);
    this.insert = true;
    console.log(this.token);
    console.log(this.post);
    this.postService.create(this.token, this.post).subscribe(
      response => {
        if (response.status == 'success') {
          this.post = response.post;
          this.status = response.status;
          // this.router.navigate(['inicio']);
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
