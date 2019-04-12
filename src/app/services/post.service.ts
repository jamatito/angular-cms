import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from './global';

@Injectable()
export class PostService {
  public url: string;

  constructor(
    public http: HttpClient
  ) {
    this.url = global.url;
  }


  create(token, post): Observable<any> {
    let json = JSON.stringify(post);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.post(this.url + 'post/', params, {headers: headers});
  }

  // getCategories(): Observable<any> {
  //   let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  //   return this.http.get(this.url + 'category/', {headers: headers});
  // }

}
