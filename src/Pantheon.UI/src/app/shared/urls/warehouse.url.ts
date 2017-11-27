import { Injectable } from '@angular/core';
@Injectable()
export class WarehouseUrl {
    private static DEFAULT = '/stock';
    public static get WAREHOUSE_URL(): string { return this.DEFAULT; }
    public static get GET_ALL_WAREHOUSE_URL(): string { return this.DEFAULT + '/get-warehouses'; }
    public static get GET_WAREHOUSE_WITH_STOCK_URL(): string { return this.DEFAULT + '/get-warehouses-with-stock'; }
}
