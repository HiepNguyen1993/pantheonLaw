import { Injectable } from '@angular/core';
@Injectable()
export class InvoiceUrl {
    private static DEFAULT = '/invoice';
    public static get INVOICE_URL(): string { return this.DEFAULT; }
    public static get SEARCH_INVOICE_URL(): string { return this.DEFAULT + '/search'; }
    public static get SEARCH_INVOICE_BY_ID(): string { return this.DEFAULT + '/search-by-id'; }
    public static get GET_INVOICE_LINES_URL(): string { return this.DEFAULT + '/get-invoice-lines'; }
    public static get INSERT_UPDATE_INVOICE_URL(): string { return this.DEFAULT + '/insertOrUpdate'; }
}
