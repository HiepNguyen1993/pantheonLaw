import { CacheName } from './const';
import { LocalStorage } from './localStorage';
import { Common } from './common';
const moment = require('moment');
import { Cache } from './cache';
export class AuthHelper {
    public static resetLocalStorage() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('access_expire');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('user_permissions');
        localStorage.removeItem('user_access_pages');
        localStorage.removeItem('token');
        // localStorage.removeItem(CacheName.FAVORITE_PRODUCT);
        Cache.remove(CacheName.FAVORITE_PRODUCT);
    }

    public static setupAuthorizeLocalStorage(profile) {
        if (profile) {
            localStorage.setItem('access_token', profile['access_token']);
            localStorage.setItem('access_expire', profile['.expires']);
            localStorage.setItem('refresh_token', profile['refresh_token']);
            localStorage.setItem('userInfo', profile['userProfile']);
            localStorage.setItem('token', JSON.stringify(profile));
        }
    }

    public static jQueryAjaxSetup() {
        // We setup here for jQuery ajax
        $(document).ajaxError(function (event, request, settings) {
            console.log(request);
            if (request.status === 401 && request.statusText === 'Unauthorized') {
                window.location.href = '/login';
                console.log('go to login');
            }
        });

        $.ajaxSetup({
            beforeSend: function (xhr) {
                console.log(xhr);
                const token = localStorage.getItem('access_token');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Accept', 'application/json');
                if (token) {
                    xhr.setRequestHeader('Authorization', `bearer ${token}`);
                }
            },
            complete: function (xhr) {
                console.log(xhr);
            }
        });
    }

    public static tokenNotExpired(tokenName?: string, jwt?: string) {
        return AuthHelper.hasAccessToken(tokenName, jwt) && !AuthHelper.isTokenExpired();
    }

    public static isUserLoginExpired() {
        return AuthHelper.hasAccessToken() && AuthHelper.isTokenExpired();
    }

    private static hasAccessToken(tokenName?: string, jwt?: string) {
        const authToken: string = tokenName || 'access_token';
        let token: string;

        token = jwt && jwt !== 'undefined' ? jwt : localStorage.getItem(authToken);
        return token;
    }

    private static isTokenExpired() {
        const accessExpire = localStorage.getItem('access_expire');
        return accessExpire && moment().isAfter(accessExpire);
    }

    public static isLoggedIn() {
        if (AuthHelper.tokenNotExpired()) {
            return true;
        }
        return false;
    }

    public static loginAuthen() {
        if (AuthHelper.tokenNotExpired()) {
            return true;
        }
        return false;
    }
}
