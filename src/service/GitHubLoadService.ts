'use strict'

var env = require('node-env-file');
env('.auth');

var GitHubApi = require("github");
var gitHubClient;

import * as https from 'https';
import {Observable} from 'rx';
import {PostDetails} from '../model/PostDetails';

/**
 * 
 */
export class GitHubLoadService {

    constructor() {
        gitHubClient = new GitHubApi({});
        gitHubClient.authenticate({
            type: "oauth",
            token: process.env.GITHUB_TOKEN
        });
    }

    loadQuickHitPosts():Observable<Array<PostDetails>> {
        return this.generatePostsRxList()
                .flatMap((listOfPosts) => {
                    return Observable.from(listOfPosts);
                })
                .flatMap((post) => {
                    console.log(">> Here is some post information: " + post.description);
                    //post.description
                    //post.created_at
                    //post.files.keys[0]
                    //post.files[<key>].raw_url

                    return this.downloadUrl("host", "dirPath");
                }, (origPost, fileContents) => {
                    origPost.mainContent = fileContents;
                    return origPost;
                })
                .toArray();
    }

    generatePostsRxList():Observable<Array<any>> {
        return Observable.create<Array<any>>((subscriber) => {
            gitHubClient.gists.getAll({}, (err, res) => {
                var quickHitPosts = new Array<any>();

                for (var gist of res) {
                    if (gist.description.startsWith("Quick")) {
                        // var post = new PostDetails();
                        // post.title = "This is a test post";

                        quickHitPosts.push(gist);
                    }
                }

                subscriber.onNext(quickHitPosts);
            });
        });
    }

    downloadUrl(host: string, dirPath: string):Observable<string> {
        return Observable.create<string>((subscriber) => { 
            subscriber.onNext("Check me out I have some contents!")
        });

        // var urlRawData:string = "";
            
        // https.get({ 
        //     host: host,
        //     path: dirPath
        // }, (response) => {
        //     response.on('data', (chunk) => urlRawData += chunk)
            
        //     response.on('end', () => {
                
        //     });
        // });
    }

}