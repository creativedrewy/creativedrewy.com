'use strict'

var env = require('node-env-file');
env('.env');

var tumblr = require('tumblr');
var tumblrClient;

import {Observable} from 'rx';   //http://stackoverflow.com/questions/35919693/typescript-cannot-find-name-ipromise-in-rxjs-definition
import {PostDetails} from '../model/PostDetails';

export class TumblrLoadService {
    
    /**
     * Constructor
     */
    constructor() {
        tumblrClient = tumblr.createClient({
            consumer_key: '',
            consumer_secret: '',
            token: '',
            token_secret: ''
        });
    }
    
    /**
     * 
     */
    loadTumblrData():Observable<Array<PostDetails>> {
        
        return null;
    }
    
    /**
     * 
     */
    parsePostData(jsonSource: string):Array<PostDetails> {
        
    }
}