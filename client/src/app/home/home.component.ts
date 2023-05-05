import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../_services/post.service';
import { CommentService } from '../_services/comment.service';
import { Posts } from '../interfaces/posts';
import { Comments } from '../interfaces/comments';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts$: Observable<Posts[]> = new Observable();
  comments$: Observable<Comments[]> = new Observable();
  isOpened = false;
  OpenedPost?: string;
  commentErr = false;
  

  form: any ={
    text: null,
  }
  constructor(private PostService: PostService,private CommentService: CommentService) { }

  ngOnInit(): void {
    this.fetchPosts();
    
  }

  private fetchPosts(): void {
    this.posts$ = this.PostService.getPosts();
    
  }
  private fetchComments(): void {
    this.comments$ = this.CommentService.getAllComment();    
  }
  onOpenComment(post_id: string): void{
    if(this.OpenedPost != post_id){
      this.isOpened = true;
      
    }else{
      this.isOpened = !this.isOpened;
    }
    this.commentErr = false;
    this.OpenedPost = post_id;
    console.log(this.isOpened);
    this.fetchComments();
  }

  onSubmit(post_id: string): void {
    const {text} = this.form;
    this.CommentService.createComment(post_id,text).subscribe({
      next: data =>{
        console.log(data);
        
        window.location.reload();
      },
      error: err => {
        console.log(err);
        this.commentErr = true;
      }
    });
    
  }

}
