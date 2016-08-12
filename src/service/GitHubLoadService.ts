'use strict'

var env = require('node-env-file');
env('.auth');

var GitHubApi = require("github");

import {Observable} from 'rx';
import {PostDetails} from '../model/PostDetails';

/**
 * 
 */
export class GitHubLoadService {

    doSomeStuff() {
        var github = new GitHubApi({ });

        github.authenticate({
            type: "oauth",
            token: process.env.GITHUB_TOKEN
        })

        var gists = github.gists.getAll({}, (err, res) => {
            for (var gist of res) {
                if (gist.description.startsWith("Quick")) {
                    console.log(gist)
                }
            }
        })
    }

}