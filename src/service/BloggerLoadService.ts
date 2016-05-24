'use strict'

var env = require('node-env-file');
env('.env');

import * as https from 'https';
import * as Q from 'q';
import * as post from '../model/PostDetails'

export class BloggerLoadService {
        
    /**
     * 
     */
    loadBloggerData():Q.Promise<Array<post.PostDetails>> {        
        return Q.Promise<Array<post.PostDetails>>((resolve, reject) => {
            var blogRawData:string = "";
            
            https.get({ 
                host: "www.googleapis.com",
                path: "/blogger/v3/blogs/6463744994222299033/posts?key=" + process.env.BLOGGER
            }, (response) => {
                response.on('data', (chunk) => {
                    blogRawData += chunk;
                })
                
                response.on('end', () => {
                    resolve(this.parsePostData(blogRawData));
                });
            })
        });
    }
    
    /**
     * 
     */
    parsePostData(jsonSource: string):Array<post.PostDetails> {
        var sourceData = JSON.parse(jsonSource);
        var posts:Array<post.PostDetails> = new Array<post.PostDetails>();
        
        for (var item of sourceData.items) {
            var details:post.PostDetails = new post.PostDetails();
            details.title = item.title;
            details.postDate = item.published;
            details.linkUrl = item.url;
            details.mainContent = item.content;
            
            posts.push(details);
        }
        
        return posts;
    }
    
};