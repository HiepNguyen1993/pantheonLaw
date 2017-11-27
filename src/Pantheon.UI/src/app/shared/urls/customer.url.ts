import { Injectable } from '@angular/core';
@Injectable()
export class CustomerUrl {
    private static DEFAULT = '/customer';
    public static get CUSTOMER_URL(): string { return this.DEFAULT; }
    public static get GET_CUSTOMER_LIST(): string { return this.DEFAULT + '/get-customer-list'; }
    public static get GET_CUSTOMER_BY_ID(): string { return this.DEFAULT + '/get-customer-by-id'; }
    public static get UPDATE_CUSTOMER(): string { return this.DEFAULT + '/update-customer'; }
    public static get FILTER_CUSTOMER(): string { return this.DEFAULT + '/filter-customer'; }
}
