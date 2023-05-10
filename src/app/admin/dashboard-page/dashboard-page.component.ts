import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  posts: Post[] = []
  pSub$: Subscription = new Subscription();
  dSub$: Subscription = new Subscription();
  searchStr: string = '';
  constructor(private PostService: PostsService) {}
  ngOnInit() {
    this.pSub$ = this.PostService.getAll().subscribe(posts => {
      this.posts = posts;
    })
  }
  remove(id: string | undefined) {
    if (id) {
      this.PostService.delete(id).subscribe(() => {
        this.posts = this.posts.filter(post => post.id!== id);
      });
    }
  }
  ngOnDestroy() {
    if(this.pSub$) {
      this.pSub$.unsubscribe();
    }
    if(this.dSub$) {
      this.dSub$.unsubscribe();
    }
  }
}
