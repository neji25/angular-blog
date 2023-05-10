import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "../../shared/interfaces";

@Pipe({
  name: 'searchPosts'
})

export class SearchPostsPipe implements PipeTransform {
  transform(posts: Post[], search = ''): Post[] {
    if(search.trim().length === 0) {
      return posts;
    }
    return posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));
  }
}
