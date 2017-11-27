import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class CustomPreloading implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        return route.data && route.data.preload ? load() : Observable.of(null);
    }
}

export const customPreloadingProvider = { provide: PreloadingStrategy, useClass: CustomPreloading };
