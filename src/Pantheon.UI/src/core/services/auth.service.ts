import { Injectable } from '@angular/core';

@Injectable()

export class AuthService {

    private USER_INFO = 'user_info';

    public setUser<T>(user: T): void {
        localStorage[this.USER_INFO] = JSON.stringify(user);
    };

    public getUser<T>(): T | any {
        if (localStorage[this.USER_INFO]) {
            return JSON.parse(localStorage[this.USER_INFO]);
        } else {
            return null;
        }
    }

    public getToken<T>(tokenProp?: string): string {
        const user = this.getUser<T>();
        // tslint:disable-next-line:curly
        if (user) return user[tokenProp] || user.token;
    }

    // tslint:disable-next-line:member-ordering
    public isLoggedIn() {
        if (localStorage.getItem(this.USER_INFO) && JSON.parse(localStorage.getItem(this.USER_INFO)).access_token) {
            return true;
        }
        return false;
    }

    public clearUserInfo() {
        localStorage.removeItem(this.USER_INFO);
    }

    public forceReLogin() {
        this.clearUserInfo();
        window.location.href = '/#/login';
    }
};
