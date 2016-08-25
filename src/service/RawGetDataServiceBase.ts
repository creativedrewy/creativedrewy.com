'use strict'

import * as https from 'https';
import {Observable} from 'rx';

/**
 * 
 */
export class RawGetDataServiceBase {

    public downloadUrl(host: string, dirPath: string):Observable<string> {
        return Observable.create<string>((subscriber) => { 
            var urlRawData:string = "";
            
            https.get({ 
                host: host,
                path: dirPath
            }, (response) => {
                response.on('data', (chunk) => urlRawData += chunk)
                
                response.on('end', () => {
                    subscriber.onNext(urlRawData);
                });
            });
        });
    }
    
}