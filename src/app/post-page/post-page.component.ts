import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../shared/posts.service';
import { Observable, switchMap } from 'rxjs';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  
  post$: Observable<Post> = new Observable();
  
  constructor(
      private route: ActivatedRoute,
      private postsService: PostsService
    ) {}

    ngOnInit(): void {
      this.post$ = this.route.params
        .pipe(switchMap(params => this.postsService.getById(params['id'])));
    }
}
