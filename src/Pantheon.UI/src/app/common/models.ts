export class PageResponse {
    public data: any;
    public itemsCount: number;

    constructor(jsonData) {
        this.data = jsonData['data'];
        this.itemsCount = jsonData['itemsCount'];
    }
}

export class PageModel {
    public pageIndex: number;
    public pageSize: number;
    public sortField: string;
    public sortOrder: string;
}