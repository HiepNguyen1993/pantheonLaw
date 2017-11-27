import { Injectable } from '@angular/core';
@Injectable()
export class OrderUrl {
    private static DEFAULT = '/order';
    public static get ORDER_URL(): string { return this.DEFAULT; }
    public static get SEARCH_ORDER_URL(): string { return this.DEFAULT + '/search'; }
    public static get SEARCH_ORDER_BY_ID(): string { return this.DEFAULT + '/search-by-id'; }
    public static get GET_ORDER_LINES_URL(): string { return this.DEFAULT + '/get-order-lines'; }
    public static get GET_SELLERS_URL(): string { return this.DEFAULT + '/get-sellers'; }
    public static get INSERT_UPDATE_ORDER_URL(): string { return this.DEFAULT + '/insertOrUpdate'; }
    public static get GET_LINE_URL(): string { return this.DEFAULT + '/get-order-line'; }
    public static get INSERT_UPDATE_ORDER_LINE_URL(): string { return this.DEFAULT + '/insert-update-order-line'; }
    public static get DELETE_ORDER_LINE_URL(): string { return this.DEFAULT + '/delete-order-line'; }
    public static get CHANGE_ARTICLE_WHEN_EDITING_ORDER_LINE_URL(): string { return this.DEFAULT + '/change-article-when-editing-order-line'; }
    public static get CHANGE_LINE_PRICE_VALUES_URL(): string { return this.DEFAULT + '/change-line-price-values'; }
}
