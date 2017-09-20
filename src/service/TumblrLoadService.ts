'use strict'

var tumblr = require('tumblr.js');
var tumblrClient;

const postCount:number = 10;    //Change this to set how many tumblr link posts show in the layout

import { Observable } from 'rx';
import { PostDetails } from '../model/PostDetails';
import { EnvironmentVarsService } from './EnvironmentVarsService';

/**
 * Encapsulates functionality with the tumblr API
 */
export class TumblrLoadService {
    
    /**
     * Constructor
     */
    constructor() {
        var env = new EnvironmentVarsService();

        tumblrClient = tumblr.createClient({
            consumer_key: env.getEnvVar("TUMBLR_CONSUMER_KEY"),
            consumer_secret: env.getEnvVar("TUMBLR_CONSUMER_SECRET"),
            token: env.getEnvVar("TUMBLR_TOKEN"),
            token_secret: env.getEnvVar("TUMBLR_TOKEN_SECRET")
        });
    }
    
    /**
     * Load the tumblr data as an rx operation
     */
    loadTumblrData():Observable<Array<PostDetails>> {
        return Observable.create<Array<PostDetails>>((observer) => {
            tumblrClient.blogPosts('creativedrewy', (err, data) => {
                var postData = this.parsePostData(data);
                observer.onNext(postData.slice(0, postCount));
            });
        });
    }
    
    /**
     * Convert the data that comes back from tumblr to the objects used in the layout
     */
    parsePostData(dataSource: any):Array<PostDetails> {
        var posts:Array<PostDetails> = new Array<PostDetails>();
        
        for (var tumblrPost of dataSource.posts) {
            if (tumblrPost.type == 'link') {
                var details:PostDetails = new PostDetails();
                details.title = tumblrPost.title;
                details.linkUrl = tumblrPost.url;
                details.mainContent = tumblrPost.description
                
                posts.push(details);
            }
        }
        
        return posts;
    }
}