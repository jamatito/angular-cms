import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from './global';

@Injectable()
export class CommentService {
  public url: string;

  constructor(
    public http: HttpClient
  ) {
    this.url = global.url;
  }


  create(token, comment): Observable<any> {
    let json = JSON.stringify(comment);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.post(this.url + 'comment/', params, {headers: headers});
  }

  getCommentByPost(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'comment/post/' + id, {headers: headers});
  }


}
