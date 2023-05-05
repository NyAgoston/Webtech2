import { Component, OnInit } from '@angular/core';
import { PostService } from '../_services/post.service';
import { Observable } from 'rxjs';
import { Posts } from '../interfaces/posts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  form: any = {
    title: null,
    text: null
  };
  posts$: Observable<Posts[]> = new Observable();

  modal_id?: string;
  modal_username?: string;
  modal_date?: string;
  modal_title?: string;
  modal_text?: string;


  constructor(private PostService: PostService,private router: Router) { }

  ngOnInit(): void {
    this.fetchUserPosts();
  }

  private fetchUserPosts(): void {
    this.posts$ = this.PostService.getUserPosts();
  }

  onDelete(id: string): void {
    this.PostService.deletePost(id).subscribe({
      next: res => {
        console.log(res);       
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });   
  }
  onModify(id: string): void {
     this.PostService.getSinglePosts(id).subscribe({
      next: res => {
        console.log(res);    
        this.modal_id = res._id;
        this.modal_username = res.username;
        this.modal_date = res.date;
        this.modal_text = res.text;
        this.modal_title = res.title;
      },
      error: err => {
        console.log(err);
      }
     })
  }
  onSubmit(): void {
    const { title, text } = this.form;
    
    this.PostService.updatepost(title, text,this.modal_id).subscribe({
      next: data => {
        console.log(data); 
        window.location.reload(); 
      },
      error: err => {
        console.log(err); 
      }
    });
  }
}
