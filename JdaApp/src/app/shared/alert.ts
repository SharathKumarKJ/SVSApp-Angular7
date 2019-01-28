 interface Alert {
    type: string;
    message: string;
}

export class ALERT {

    public static readonly ALERTS: Alert[] = [{
        type: 'success',
        message: 'Record has been added',
    }, {
        type: 'info',
        message: 'Records has been loaded',
    }, {
        type: 'warning',
        message: 'This is a warning alert',
    }, {
        type: 'danger',
        message: 'This is a danger alert',
    }, {
        type: 'primary',
        message: 'This is a primary alert',
    }, {
        type: 'secondary',
        message: 'This is a secondary alert',
    }, {
        type: 'light',
        message: 'This is a light alert',
    }, {
        type: 'dark',
        message: 'This is a dark alert',
    }
    ];
}