'use strict'

import * as Q from 'q'; 

export class BloggerLoadService {
    /**
     * 
     */
    loadBloggerData():Q.Promise<string> {
        return Q.Promise<string>((resolve, reject) => {
            //resolve("this works!");
        });
    }
};