'use strict'

var url = require('url');

var env = require('node-env-file');
env('.auth');

var GitHubApi = require("github");
var gitHubClient;

import * as https from 'https';
import {Observable} from 'rx';
import {PostDetails} from '../model/PostDetails';
import {RawGetDataServiceBase} from './RawGetDataServiceBase';
import {DateUtil} from '../util/DateUtil';
import {StringUtil} from '../util/StringUtil';

/**
 * Service to load my specific GH gists and return them as the common data to display in my article list
 */
export class GitHubLoadService extends RawGetDataServiceBase {
    private postPrefixToken: string = "";
    private removePrefix: boolean = true;

    constructor(prefix: string, remove: boolean = true) {
        super();

        this.postPrefixToken = prefix;
        this.removePrefix = remove;

        gitHubClient = new GitHubApi({});
        gitHubClient.authenticate({
            type: "oauth",
            token: process.env.GITHUB_TOKEN
        });
    }

    /**
     * Return my "Quick Hit" posts in the to display on my site
     */
    loadQuickHitPosts():Observable<Array<PostDetails>> {
        return this.convertPostAndGetArticle(this.generatePostsRxList()
                .flatMap(listOfPosts => Observable.from(listOfPosts)))
                .toArray()
                .map(items => items.sort((left, right) => new Date(left.postDate) >= new Date(right.postDate) ? 0 : 1));
    }

    /**
     * Get my "Quick Hit" GitHub gists in the github library format via rx
     */
    generatePostsRxList():Observable<Array<any>> {
        return Observable.create<Array<any>>((subscriber) => {
            gitHubClient.gists.getAll({}, (err, res) => {
                var quickHitPosts = new Array<any>();

                for (var gist of res) {
                    if (gist.description.startsWith(this.postPrefixToken)) {
                        quickHitPosts.push(gist);
                    }
                }

                subscriber.onNext(quickHitPosts);
                subscriber.onCompleted();
            });
        });
    }

    /**
     * Load a Gist post by its individual id
     */
    loadPostById(id: string): Observable<PostDetails> {
        return this.convertPostAndGetArticle(this.getGistById(id));
    }

    /**
     * Wrap the GH client lib, getting the Gist and returning as rx
     */
    getGistById(postId: string): Observable<any> {
        return Observable.create<PostDetails>((subscriber) => {
            gitHubClient.gists.get({ id: postId }, (err, res) => {
                subscriber.onNext(res);
                subscriber.onCompleted();
            });
        });
    }

    /**
     * Convert raw GH gist to a PostDetails object and download the markdown article contents
     */
    convertPostAndGetArticle(post: Observable<any>): Observable<PostDetails> {
        return post.flatMap(post => {
                    var firstFileKey = Object.keys(post.files)[0];
                    var fullPostFileUrl = post.files[firstFileKey]['raw_url'];
                    var uri = url.parse(fullPostFileUrl);

                    return this.downloadUrl(uri.host, uri.path);
                }, 
                (origPost, fileContents) => this.convertGistDataToPostDetails(origPost, fileContents))
                .flatMap(partialPost => this.generatePostMarkup(partialPost.mainContent),  
                (post, htmlResult) => {
                    post.mainContent = htmlResult;
                    return post;
                });
    }

    /**
     * Convert the gist json to a PostDetails object also using the source post contents data
     */
    convertGistDataToPostDetails(gistData: any, fileContents: string): PostDetails {
        var post = new PostDetails();
        post.mainContent = fileContents;
        post.linkUrl = gistData.html_url;
        post.postDate = DateUtil.convertDateToSiteFormat(gistData.created_at);

        var title: string = gistData.description;
        if (this.removePrefix) 
            title = title.replace(this.postPrefixToken, "").trim();
        post.title = title;
        post.permaLink = StringUtil.genPermalink(title, "gh", gistData.id)

        return post;
    }

    /**
     * Convert a post markdown source to rendered xml via rx
     */
    generatePostMarkup(markdownSource: string):Observable<string> {
        return Observable.create<string>((subscriber) => {
            gitHubClient.misc.renderMarkdown({ 
                "text": markdownSource 
            }, (err, result) => {
                subscriber.onNext(result["data"]);
                subscriber.onCompleted();
            });
        });
    }

}