import { Injectable } from '@angular/core';
@Injectable()
export class ProductUrl {
    private static DEFAULT = '/article';
    public static get PRODUCT_URL(): string { return this.DEFAULT; }
    public static get SEARCH_PRODUCT_URL(): string { return this.DEFAULT + '/search'; }
    public static get GET_ARTICLE_STOCK_LIST_URL(): string { return this.DEFAULT + '/get-article-stock-list'; }
    public static get INSERT_UPDATE_PRODUCT_URL(): string { return this.DEFAULT + '/insertOrUpdate'; }

    public static get FILTER_ARTCILE_URL(): string { return this.DEFAULT + '/filter-article'; }

    // structure urls
    public static get CHECK_SIZE(): string { return this.DEFAULT + '/check-size-product'; }
    public static get GET_STRUCTURE_OPTIONS(): string { return this.DEFAULT + '/get-list-of-options'; }
    public static get FINISH_STRUCTURE(): string { return this.DEFAULT + '/finish-structure'; }
    public static get GET_PRODUCT_STRUCTURE(): string { return this.DEFAULT + '/get-product-structure'; }
}
