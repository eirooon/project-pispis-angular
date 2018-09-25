import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs/Observable';
import { Logger } from './logger.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

    CLASSNAME: string = this.constructor.name;

    constructor(
        private authService: AuthService,
        private router: Router,
        private logger: Logger
    ) { }

    /**
     * Method: canActivate
     * Description: 
     * @param next 
     * @param state 
     * @return boolean
     */
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {

        if (this.authService.isAuthenticated()) {
            return true;
        }
        else {
            this.router.navigate(['/signin']);
            return false;
        }
    }
}