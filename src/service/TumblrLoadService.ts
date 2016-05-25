'use strict'

var env = require('node-env-file');
env('.env');

var tumblr = require('tumblr.js');
var tumblrClient;

import {Observable} from 'rx';   //http://stackoverflow.com/questions/35919693/typescript-cannot-find-name-ipromise-in-rxjs-definition
import {PostDetails} from '../model/PostDetails';

export class TumblrLoadService {
    
    /**
     * Constructor
     */
    constructor() {
        tumblrClient = tumblr.createClient({
            consumer_key: process.env.TUMBLR_CONSUMER_KEY,
            consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
            token: process.env.TUMBLR_TOKEN,
            token_secret: process.env.TUMBLR_TOKEN_SECRET
        });
    }
    
    /**
     * 
     */
    loadTumblrData():Observable<Array<PostDetails>> {
        return Observable.create<Array<PostDetails>>((observer) => {
            tumblrClient.blogPosts('creativedrewy', (err, data) => {
                observer.onNext(this.parsePostData(data.posts));
            });
        });
    }
    
    /**
     * 
     */
    parsePostData(dataSource: any):Array<PostDetails> {
        var posts:Array<PostDetails> = new Array<PostDetails>();
        
        for (var tumblrPost of dataSource.posts) {
            var details:PostDetails = new PostDetails();
            details.title = tumblrPost.title;
            
            posts.push(details);
        }
        
        return posts;
    }
}