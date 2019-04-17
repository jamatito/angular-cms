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

  getPost(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'post/', {headers: headers});
  }

  showPost(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'post/' + id, {headers: headers});
  }

  update(post, id, token): Observable<any> {
    let json = JSON.stringify(post);
    let params = 'json=' + json;
    console.log(token);
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this.http.put(this.url + 'post/' + id, params, {headers: headers});
  }

  delete(id, token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this.http.delete(this.url + 'post/' + id, {headers: headers});
  }

  getLastPost(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.url + 'posts/getlastposts/', {headers: headers});
  }

}
