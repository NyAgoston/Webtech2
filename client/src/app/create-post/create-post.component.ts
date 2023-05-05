import { Component, OnInit } from '@angular/core';
import { PostService} from '../_services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  form: any = {
    title: null,
    text: null
  };

  constructor(private postService: PostService,private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const { title, text } = this.form;
    this.postService.createPost(title, text).subscribe({
      next: data => {
        console.log(data); 
        this.router.navigate(['home']);      
      },
      error: err => {
        console.log(err); 
      }
    });
  }
}
