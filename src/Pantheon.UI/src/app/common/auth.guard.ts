import { PermissionOption } from './../shared/enums/permission.enum';
import { Cache } from './cache';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Common } from '../common/index';
import { AuthHelper } from './/auth.helper';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private location: Location) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('access_token') && AuthHelper.tokenNotExpired()) {
            return true;
        }

        this.router.navigate(['login']);
        return false;
    }
}
