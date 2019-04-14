import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBladeComponent } from './post-blade.component';

describe('PostBladeComponent', () => {
  let component: PostBladeComponent;
  let fixture: ComponentFixture<PostBladeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostBladeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBladeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
