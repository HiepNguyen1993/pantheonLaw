export class NotifyType {
    public static DEFAULT = 'default';
    public static PRIMARY = 'primary';
    public static SUCCESS = 'success';
    public static INFO = 'info';
    public static WARNING = 'warning';
    public static DANGER = 'danger';
}

export class Constants {
    public static get STORAGE_USER_ID(): string { return 'user_id'; }
    public static get STORAGE_PROFILE(): string { return 'userProfile'; }
    public static get STORAGE_ACCESS_TOKEN(): string { return 'access_token'; }
    public static get STORAGE_USER_PERMISSIONS(): string { return 'user_permissions'; }
    public static get STORAGE_USER_ACCESS_PAGES(): string { return 'user_access_pages'; }
    public static get CURRENT_UNCONFIRM_MISSION(): string { return 'current_unconfirm_mission'; }
}

export class LocalPath {
    public static get JSON(): string { return '/assets/json/'; }
}

export class PageMode {
    public static ADD = 'Add';
    public static EDIT = 'Edit';
    public static CLONE = 'Cloned';
    public static COPY = 'Copy';
}

export class CacheName {
    public static get FAVORITE_PRODUCT(): string { return 'favorite_product'; }
}
