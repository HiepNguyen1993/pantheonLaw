import { SearchConditionModel } from './search-condition.model';
export class StoreModel {
    searchCondition: SearchConditionModel[];
    constructor() {
        this.searchCondition = new Array<SearchConditionModel>();
    }
}