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
            var blogRawData:string = "";
            
            https.get({ 
                host: "www.googleapis.com",
                path: "/blogger/v3/blogs/6463744994222299033/posts?key=" + process.env.BLOGGER
            }, (response) => {
                response.on('data', (chunk) => {
                    blogRawData += chunk;
                })
                
                response.on('end', () => {
                    resolve(blogRawData);
                });
            })
        });
    }
    
};