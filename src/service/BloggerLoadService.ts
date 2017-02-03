'use strict'
import { StringUtil } from '../util/StringUtil';

var env = require('node-env-file');
env('.auth');

import * as https from 'https';
import {Observable} from 'rx';   //http://stackoverflow.com/questions/35919693/typescript-cannot-find-name-ipromise-in-rxjs-definition
import {PostDetails} from '../model/PostDetails';
import {DateUtil} from '../util/DateUtil';
import {RawGetDataServiceBase} from './RawGetDataServiceBase';

/**
 * Encapsulates functionality with the Blogger API
 */
export class BloggerLoadService extends RawGetDataServiceBase {
    baseUrl: string = "www.googleapis.com"
    postsEndpoint: string = "/blogger/v3/blogs/6463744994222299033/posts"
        
    appendApiKey(endpoint: string): string {
        return endpoint + "?key=" + process.env.BLOGGER;
    }

    /**
     * Load the blogger data as an rx operation
     */
    loadBloggerData():Observable<Array<PostDetails>> {
        return this.downloadUrl(this.baseUrl, 
                                this.appendApiKey(this.postsEndpoint))
                    .map(jsonSource => {
                        var sourceData = JSON.parse(jsonSource);
                        var posts:Array<PostDetails> = new Array<PostDetails>();
                        
                        for (var item of sourceData.items) {
                            var details:PostDetails = this.parseSinglePost(item);
                            posts.push(details);
                        }
                        
                        return posts;
                    });
    }

    /**
     * Load a blogger post by its id
     */
    loadPostById(id: string): Observable<PostDetails> {
        return this.downloadUrl(this.baseUrl, 
                                this.appendApiKey(this.postsEndpoint + "/" + id))
                    .map(jsonSource => this.parseSinglePost(JSON.parse(jsonSource)));
    }
    
    /**
     * Grab the props from a blogger post entry and convert to a PostDetails object
     */
    parseSinglePost(item: any): PostDetails {
        var details:PostDetails = new PostDetails();
        details.title = item.title;
        details.postDate = DateUtil.convertDateToSiteFormat(item.published);
        details.linkUrl = item.url;
        details.mainContent = item.content;
        details.permaLink = StringUtil.genPermalink(item.title, "bl", item.id);
        
        return details;
    }
    
};