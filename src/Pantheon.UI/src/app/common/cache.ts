import { DateTimeUtil } from '../common/utilities';
import { isArray } from 'lodash';
import { EncryptionService } from '../shared/services/encryption.service';
import { ApiConfig } from '../../config/api.config';

export class Cache {
    public static _preffix = '__c_';
    private static useCache = ApiConfig.cache;

    public static setCache(name: string, data: any) {
        if (!this.useCache) { return; }

        const cacheObject = new CacheObject();
        cacheObject.expire = DateTimeUtil.addDays(new Date(), 1).getTime();
        cacheObject.data = data;
        localStorage.setItem(this._preffix + name, EncryptionService.encrypt(JSON.stringify(cacheObject)));
    }

    public static getCache(name: string, callback: Function = null): any {
        if (!this.useCache) { return null; }

        const cacheObject: CacheObject = this.getCacheObject(name);

        if (cacheObject === null) { return null; }

        const expireDate = new Date(cacheObject.expire);
        if (expireDate > new Date()) {
            return cacheObject.data;
        } else {
            delete localStorage[this._preffix + name];
            if (callback !== null) {
                return callback();
            }
            return null;
        }
    }

    public static getDirectCache(name) {
        return JSON.parse(localStorage[name]);
    }

    private static getCacheObject(name): CacheObject {
        if (!this.useCache) { return null; }

        if (localStorage.getItem(this._preffix + name) === null) {
            return null;
        }
        const cacheObject: CacheObject = JSON.parse(JSON.parse(EncryptionService.decrypt(localStorage.getItem(this._preffix + name))));
        return cacheObject;
    }

    /**
     * Check valid of cache by name
     * @param name Name of cache
     * @param callback The callback(isValid: boolean) after check valid
     */
    public static isValid(name: string, callback: Function = () => { }) {
        const cacheObject = this.getCacheObject(name);

        // If this cache has not been created
        if (cacheObject === null) {
            callback(null);
            return null;
        }

        const isValid = new Date(cacheObject.expire) > new Date();
        callback(isValid);
        return isValid;
    }

    public static isValidAsync(name: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const cacheObject = this.getCacheObject(name);
            let isValid = false;

            if (cacheObject === null) {
                resolve(isValid);
                return;
            }

            isValid = new Date(cacheObject.expire) > new Date();
            resolve(isValid);
        });
    }

    public static remove(args: string | string[]) {
        if (isArray(args)) {
            (<string[]>args).forEach(item => delete localStorage[this._preffix + item]);
        } else {
            delete localStorage[this._preffix + args];
        }
    }
}

export class CacheObject {
    public expire: number;
    public data: any;
}
