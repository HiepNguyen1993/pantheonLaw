import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// https://stacksandfoundations.com/2016/06/24/using-class-inheritance-to-hook-to-angular2-component-lifecycle/
export class SafeUnsubscriber implements OnDestroy {
    private subscriptions: Subscription[] = [];

    constructor() {
        let f = this.ngOnDestroy;

        this.ngOnDestroy = () => {
            f();
            this.unsubscribeAll();
        };
    }

    protected safeSubscription(sub: Subscription): Subscription {
        this.subscriptions.push(sub);
        return sub;
    }

    private unsubscribeAll() {
        this.subscriptions.forEach(element => {
            element.unsubscribe();
        });
    }

    ngOnDestroy() {
        // no-op
    }
}