import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "../../shared/interfaces";
import {AuthServices} from "../shared/services/auth.services";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  message: string = ''

  constructor(
    public auth: AuthServices,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup<any>({
      email: new FormControl(null, [
        Validators.email, Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(params['loginFirst']) {
        this.message = 'Сначала войдите в систему!'
      } else if (params['authFaild']) {
        this.message = 'Сессия истекла. Войдите в систему заново'
      }
    })
  }

  submit() {
    if(this.form.invalid) {
      return
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
    })
  }
}
