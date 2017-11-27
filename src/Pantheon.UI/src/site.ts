// define own script
export class WebCore {
    public static MetsiMenu() {
        $('#side-menu').metisMenu();
    }
    public static tryToFinished(maxLoop, conditionFn, callback, time) {
        const startWait = 0;
        const __waiting = setInterval(function () {
            if (conditionFn && conditionFn()) {
                callback();
                clearInterval(__waiting);
            }
            if (startWait > maxLoop) {
                clearInterval(__waiting);
            }
        }, time);
    }
}
