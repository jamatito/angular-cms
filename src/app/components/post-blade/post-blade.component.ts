import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-post-blade',
  templateUrl: './post-blade.component.html',
  styleUrls: ['./post-blade.component.css']
})
export class PostBladeComponent implements OnInit {
  @Input() posts;
  @Input() identity;
  @Input() url;

  constructor() {
  }

  ngOnInit() {
  }

}
