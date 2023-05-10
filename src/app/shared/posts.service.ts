import { HttpClient } from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Post } from "./interfaces";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {FbCreateResponse} from "./interfaces";

@Injectable({providedIn: 'root'})

export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<FbCreateResponse>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map((response: FbCreateResponse): Post => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date),
        }
      }))
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map((key: string) => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date),
          }))
      }))
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }
}
