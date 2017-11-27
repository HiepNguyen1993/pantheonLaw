import { Injectable } from '@angular/core';
@Injectable()
export class RoleUrl {
    private static DEFAULT = '/role';
    public static get ROLE_URL(): string { return this.DEFAULT; }
    public static get UICONFIG_GET_ELEMENT(): string { return this.DEFAULT + '/get-ui-config-element-by-uiid'; }
    public static get UICONFIG_GET_URL(): string { return this.DEFAULT + '/get-ui-config-page'; }
    public static get UICONFIG_GET_ALL_URL(): string { return this.DEFAULT + '/get-all-ui-config'; }
    public static get UICONFIG_UPDATE_ITEM_URL(): string { return this.DEFAULT + '/update-ui-config-item'; }
    public static get MENU_ROLE_URL(): string { return this.DEFAULT + '/get-menu-role'; }
    public static get CUSTOMER_ROLE_URL(): string { return this.DEFAULT + '/update-element-status'; }
}
