import { Injectable } from '@angular/core';
@Injectable()
export class PermissionUrl {
    private static DEFAULT = '/role';
    public static get SEARCH_ORDER_URL(): string { return this.DEFAULT + '/search'; }
}
