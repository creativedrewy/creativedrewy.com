'use strict'

var env = require('node-env-file');
env('.env');

import * as https from 'https';
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