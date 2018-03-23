import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService: AuthService, private router: Router){}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {

            if(this.authService.isAuthenticated())
                return true;
            else{
                this.router.navigate(['/signin']);
                return false;
            }
    }
}