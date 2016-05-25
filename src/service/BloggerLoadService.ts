'use strict'

var env = require('node-env-file');
env('.env');

import * as https from 'https';
import {Observable} from 'rx';   //http://stackoverflow.com/questions/35919693/typescript-cannot-find-name-ipromise-in-rxjs-definition
import {PostDetails} from '../model/PostDetails';

/**
 * Encapsulates functionality with the Blogger API
 */
export class BloggerLoadService {
        
    /**
     * Load the blogger data as an rx operation
     */
    loadBloggerData():Observable<Array<PostDetails>> {
        return Observable.create<Array<PostDetails>>((observer) => {
            var blogRawData:string = "";
            
            https.get({ 
                host: "www.googleapis.com",
                path: "/blogger/v3/blogs/6463744994222299033/posts?key=" + process.env.BLOGGER
            }, (response) => {
                response.on('data', (chunk) => {
                    blogRawData += chunk;
                })
                
                response.on('end', () => {
                    observer.onNext(this.parsePostData(blogRawData));
                });
            })
        });
    }
    
    /**
     * Convert the data that comes back from blogger to the objects used in the layout
     */
    parsePostData(jsonSource: string):Array<PostDetails> {
        var sourceData = JSON.parse(jsonSource);
        var posts:Array<PostDetails> = new Array<PostDetails>();
        
        for (var item of sourceData.items) {
            var details:PostDetails = new PostDetails();
            details.title = item.title;
            details.postDate = item.published;
            details.linkUrl = item.url;
            details.mainContent = item.content;
            
            posts.push(details);
        }
        
        return posts;
    }
    
};