import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../shared/interfaces";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {FbAuthResponse} from "../../../../environments/interface";

@Injectable()


export class AuthServices {

    public error$: Subject<string> = new Subject<string>();
    constructor(private http: HttpClient) {
    }

    get token(): string | null {
      const strExpDate =  localStorage.getItem('fb-token-exp')
      let expDate: Date = new Date()
      if(strExpDate) {
        expDate = new Date(strExpDate)
      }
      if(new Date() > expDate) {
        this.logout()
        return null
      }

      return localStorage.getItem('fb-token');
    }

    login(user: User): Observable<any> {
      user.returnSecureToken = true;
      return this.http.post<FbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        .pipe(
          tap(this.setToken),
          catchError(this.handleError.bind(this))
        )
    }

    logout() {
      localStorage.removeItem('fb-token')
      localStorage.removeItem('fb-token-exp')
    }

    isAuthenticated(): boolean {
      return !!this.token;
    }

    handleError(error: HttpErrorResponse): Observable<never> {
      const {message} = error.error.error;

      switch (message) {
        case 'INVALID_EMAIL':
          this.error$.next('Неверный email ');
          break
        case 'INVALID_PASSWORD':
          this.error$.next('Неверный пароль ');
          break
        case 'EMAIL_NOT_FOUND':
          this.error$.next('Пользователь с таким email не найден');
          break

      }

      return throwError(error)
    }

    private setToken(response: FbAuthResponse) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    }
}

