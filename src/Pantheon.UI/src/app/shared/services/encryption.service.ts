import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptionService {
    static secretKey = 'HKNTEAM';

    public static encrypt(jsonObj) {
        return CryptoJS.AES.encrypt(JSON.stringify(jsonObj), this.secretKey);
    }

    public static decrypt(data) {
        if (data !== null && data.length > 0) {
            const bytes = CryptoJS.AES.decrypt(data.toString(), this.secretKey);
            return bytes.toString(CryptoJS.enc.Utf8);
        } else {
            return '';
        }
    }
}