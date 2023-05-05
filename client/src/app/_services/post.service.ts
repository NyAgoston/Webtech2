import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { Posts } from '../interfaces/posts';
import { StorageService } from './storage.service';


const API_URL = 'http://localhost:3000/api/post/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts$: Subject<Posts[]> = new Subject();
  private post$: Subject<Posts> = new Subject();
  currentUser: any;

  constructor(private http: HttpClient,private storageService: StorageService) {}

  private refreshPosts() {
    this.http.get<Posts[]>(API_URL + 'all')
      .subscribe(posts => {
        this.posts$.next(posts);
      });
  }
  private refreshUserPosts() {
    this.http.get<Posts[]>(API_URL + 'search')
      .subscribe(posts => {
        this.posts$.next(posts);
      });
  }
  private refreshSinglePost(id: string) {
    this.http.post<Posts>(API_URL + 'single',
    {
      id
    },
    
    ).subscribe(post => {
        this.post$.next(post);
      });
  }
  getPosts(): Subject<Posts[]> {
    this.refreshPosts();
    return this.posts$;
  }
  getUserPosts(): Subject<Posts[]> {
    this.refreshUserPosts();
    return this.posts$;
  }
  getSinglePosts(id: string): Subject<Posts> {
    this.refreshSinglePost(id);
    return this.post$;
  }

  deletePost(id: string): Observable<any> {
    return this.http.post(
      API_URL + 'delete',
      {
        id
      },
      httpOptions
    );
  }

  createPost(title: string, text: string): Observable<any>{
    this.currentUser = this.storageService.getUser();
    const username = this.currentUser.username;
    const now = new Date();
    const date = now.toLocaleString();
    return this.http.post(
      API_URL + 'create',
      {
        "username": username,
        "date": date,
        title,
        text,        
      },
      httpOptions
    );
  }

  updatepost(title: string, text: string,id?: string){
    this.currentUser = this.storageService.getUser();
    const username = this.currentUser.username;
    const now = new Date();
    const date = now.toLocaleString();
    return this.http.put(
      API_URL + 'update',{
        id,
        "username": username,
        "date": date,
        title,
        text,
      },
      httpOptions
    );
  }
}
