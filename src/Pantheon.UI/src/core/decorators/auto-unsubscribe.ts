
/**
 * Auto un-subscribe all subscriptions
 * @export
 * @param {string[]} [blackList=[]] : List of subscriptions that will be ignore
 * @returns
 */
export function AutoUnsubscribe(blackList: string[] = []) {

    return function (constructor) {
        const original = constructor.prototype.ngOnDestroy;

        constructor.prototype.ngOnDestroy = function () {
            Object.keys(this).forEach(prop => {
                const property = this[prop];
                if (!blackList.includes(prop)) {
                    if (property && (typeof property.unsubscribe === 'function')) {
                        property.unsubscribe();
                        console.log(`%c Unsubscribed ${prop} at ${constructor.name} component`, `color: red; font-weight: bold`);
                    }
                }
            });

            // tslint:disable-next-line:no-unused-expression
            original && typeof original === 'function' && original.apply(this, arguments);
        };
    };
};
