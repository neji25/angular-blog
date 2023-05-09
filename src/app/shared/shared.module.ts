import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import { QuillModule } from "ngx-quill";
import {PostsService} from "./posts.service";

@NgModule({
  imports: [
    HttpClientModule,
    QuillModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    QuillModule
  ]
})

export class SharedModule {}
