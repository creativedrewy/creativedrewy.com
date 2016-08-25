'use strict'

var url = require('url');

var env = require('node-env-file');
env('.auth');

var GitHubApi = require("github");
var gitHubClient;

import * as https from 'https';
import {Observable} from 'rx';
import {PostDetails} from '../model/PostDetails';
import {RawGetDataServiceBase} from './RawGetDataServiceBase'

/**
 * 
 */
export class GitHubLoadService extends RawGetDataServiceBase {

    constructor() {
        super();

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
                    var firstFileKey = Object.keys(post.files)[0];
                    var fullPostFileUrl = post.files[firstFileKey]['raw_url'];
                    var uri = url.parse(fullPostFileUrl);

                    return this.downloadUrl(uri.host, uri.path);
                }, (origPost, fileContents) => {
                    console.log(">> Your file: " + fileContents)
                    //post.description
                    //post.created_at

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

}