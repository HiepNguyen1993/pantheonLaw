import { StoreModel } from './../@models/store.model';
import { SearchConditionModel } from './../@models/search-condition.model';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export class StoreService {
    // Store value in system
    public store: StoreModel;

    // check store search codition change
    private storeSearchConditionChangeSource = new Subject<Array<SearchConditionModel>>();
    storeChange$ = this.storeSearchConditionChangeSource.asObservable();
    // watch check Search Condition Store Change

    constructor() {
        this.store = new StoreModel()
     }
    checkSearchConditionStoreChange() {
        this.storeSearchConditionChangeSource.next(this.store.searchCondition);
    }

    checkSearchConditionStoreExists(uiName: string): any {
        const item = this.store.searchCondition.find(item => item.uiName === uiName);
        return item ? item.condition : null;
    }

    setSearchConditionStore(uiName: string, data: any) {
        let uiData = this.store.searchCondition.find(item => item.uiName === uiName);
        if ( uiData ) {
            uiData.condition = data;
        } else {
            uiData = new SearchConditionModel();
            uiData.uiName = uiName;
            uiData.condition = data;
            this.store.searchCondition.push(uiData);
        }
    }

    removeSearchConditionStore(uiName: string) {
        _.remove(this.store.searchCondition, item => { item.uiName === uiName; });
    }
}