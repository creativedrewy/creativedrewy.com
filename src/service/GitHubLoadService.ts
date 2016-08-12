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

    doSomeStuff() {
        var gists = gitHubClient.gists.getAll({}, (err, res) => {
            for (var gist of res) {
                if (gist.description.startsWith("Quick")) {
                    
                }
            }
        });
    }

    downloadUrl(host: string, dirPath: string) {
        var urlRawData:string = "";
            
        https.get({ 
            host: host,
            path: dirPath
        }, (response) => {
            response.on('data', (chunk) => urlRawData += chunk)
            
            response.on('end', () => {
                
            });
        });
    }

}