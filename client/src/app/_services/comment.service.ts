import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { StorageService } from './storage.service';
import { Comments } from '../interfaces/comments';

const API_URL = 'http://localhost:3000/api/comment/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private comments$: Subject<Comments[]> = new Subject();
  currentUser: any;

  constructor(private http: HttpClient, private StorageService: StorageService) { }

  //returns comments to a specific postid
  getComments(post_id: string){
    return this.http.post(
      API_URL + 'get',
      {
        post_id
      },
      httpOptions
    );
  }
  //returns all comments
  getAllComment(): Subject<Comments[]>{
    this.refreshAllComments();
    return this.comments$;
  }
  private refreshAllComments(){
    this.http.get<Comments[]>(API_URL + 'all')
      .subscribe(comments => {
        this.comments$.next(comments);
      });
  }
  //create comment
  createComment(post_id: string, text:string): Observable<any>{
    this.currentUser = this.StorageService.getUser();
    const username = this.currentUser.username;
    const now = new Date();
    const date = now.toLocaleString();
    return this.http.post(
      API_URL + 'create',{
        post_id,
        "username": username,               
        text,
        "date": date,
      },
      httpOptions
    );
  }

}
