'use strict'

import * as https from 'https';
import {Observable} from 'rx';

/**
 * Base class for services that need to do a raw Get for consumed data
 */
export class RawGetDataServiceBase {

    /**
     * Download the supplied URL and return the data as a string in an rx fashion
     */
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
                    subscriber.onCompleted();
                });
            });
        });
    }
    
}