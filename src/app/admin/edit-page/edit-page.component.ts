import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  post: Post = {
    title: '',
    text: '',
    author: '',
    date: new Date()
  }

  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    text: new FormControl(null, Validators.required)
  })

  submitted = false

  uSub$: Subscription = new Subscription()

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private alert: AlertService
  ){}

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post
        this.form.setValue({
          title: post.title,
          text: post.text
        })
    })
  }

  ngOnDestroy() {
    if(this.uSub$) {
      this.uSub$.unsubscribe()
    }
  }

  submit() {
    if(this.form.invalid) {
      return
    }

    this.submitted = true

    const {title, text} = this.form.value

    this.uSub$ = this.postService.update({
      ...this.post,
      title,
      text
    }).subscribe(() => {
      this.submitted = false
      this.alert.success('Пост был обновлен')
    })
  }
}
