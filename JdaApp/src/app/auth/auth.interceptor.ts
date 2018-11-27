import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable, } from "rxjs";
import { UserService } from "../shared/user.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, take,tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());

        if (localStorage.getItem('userToken') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
            });
            return next.handle(clonedreq).pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                    }
                }, error => {
                    if (error.status === 401) {
                        this.router.navigateByUrl('/login');
                        console.error('NICE ERROR', error);
                    }
                })
            )
        }
        else {
            this.router.navigateByUrl('/login');
        }
    }
}

