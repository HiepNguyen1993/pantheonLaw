import { Injectable } from '@angular/core';
@Injectable()
export class DeliveryAddressUrl {
    private static DEFAULT = '/deliveryaddress';
    public static get DELIVERY_ADDRESS_URL(): string { return this.DEFAULT; }
    public static get GET_DELIVERY_ADDRESS(): string { return this.DEFAULT + '/get-delivery-address'; }
    public static get GET_DELIVERY_ADDRESS_BY_ID(): string { return this.DEFAULT + '/get-delivery-address-by-id'; }
    public static get ADD_DELIVERY_ADDRESS(): string { return this.DEFAULT + '/add-delivery-address'; }
    public static get UPDATE_DELIVERY_ADDRESS(): string { return this.DEFAULT + '/update-delivery-address'; }
    public static get DELETE_DELIVERY_ADDRESS(): string { return this.DEFAULT + '/delete-delivery-address'; }
    public static get FILTER_DELIVERY_ADDRESS(): string { return this.DEFAULT + '/filter-delivery-address'; }
}
