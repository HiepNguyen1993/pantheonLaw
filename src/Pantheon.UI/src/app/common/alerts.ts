export class Alerts {
    public static async notify(message: string, icon = 'fa fa-close', type = 'info', timer = 400, title = '') {
        require.ensure([], (require) => {
            require('../../assets/js/bootstrap-notify.js');
            $(() => {
                $.notify(
                    {
                        icon: icon,
                        message: message,
                        title: title
                    }, {
                        type: type,
                        timer: timer,
                        z_index: 99999
                    });
            });
        });
    }

    public static errorNotify(message: string) {
        Alerts.notify(message, 'fa fa-close', 'danger');
    }

    public static successNotify(message: string) {
        Alerts.notify(message, 'fa fa-check', 'success');
    }
}
