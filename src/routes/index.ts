'use strict';
import { Z_ERRNO } from 'zlib';
import { PostDetails } from '../model/PostDetails';

import * as fs from 'fs';
import * as express from 'express';
import {Observable} from 'rx';
import {BloggerLoadService} from '../service/BloggerLoadService';
import {TumblrLoadService} from '../service/TumblrLoadService';
import {GitHubLoadService} from '../service/GitHubLoadService'

const router = express.Router();

var bloggerLoader:BloggerLoadService = new BloggerLoadService();
var tumblrLoader:TumblrLoadService = new TumblrLoadService();
var gitHubLoader:GitHubLoadService = new GitHubLoadService("##");

/**
 * Handle site root
 */
router.get('/', (req, res, next) => {
  Observable.zip(gitHubLoader.loadQuickHitPosts(), 
                 bloggerLoader.loadBloggerData(), 
                 tumblrLoader.loadTumblrData(),
    (githubPosts, bloggerPosts, tumblrPosts) => {
      //Get all the posts and then sort them by date
      var arrangedPosts = githubPosts.concat(bloggerPosts);
      arrangedPosts = arrangedPosts.sort((left, right) => {
        return right.sourceDate.getTime() > left.sourceDate.getTime() ? 1 : -1;
      });

      return {
        allPosts: arrangedPosts,
        tumblr: tumblrPosts
      };
    })
    .subscribe((result) => {
      res.render('index', {
        mainPosts: result.allPosts,
        tumbrlPosts: result.tumblr
      });
    })
});

/**
 * Load an article from the relevant source as well as the sidebar content
 */
router.get('/article/:permalink', (req, res, next) => {
  var urlParts = req.params['permalink'].split("-");
  var articleSource = urlParts[urlParts.length - 2];  //Get the "source" value
  var articleId = urlParts[urlParts.length - 1];  //Get the article id

  var postRx;
  if (articleSource == "gh") {
    postRx = gitHubLoader.loadPostById(articleId);
  } else {
    postRx = bloggerLoader.loadPostById(articleId);
  }

  Observable.zip(postRx, tumblrLoader.loadTumblrData(),
    (post, tumblrPosts) => {
      return {
        article: post,
        tumblr: tumblrPosts
      };
    }).subscribe(result => {
      res.render('article', { 
        articlePost: result.article,
        tumbrlPosts: result.tumblr
      });
    }, 
    err => res.redirect("/"))
});

/**
 * "Dynamic" bio js that can be embedded externally
 */
router.get('/bio.js', (req, res, next) => {
  res.send("document.write('Principal Android and Interactive developer in Austin, TX. If it\\'s a cool project, I probably want to work on it.');");
})

/**
 * Kind of like a URL shortener, but running from my website
 */
router.get('/highlight/:id', (req, res, next) => {
  var index = parseInt(req.params['id']);
  var highlightSource:string = fs.readFileSync("highlights.json", "UTF-8");
  var highlightData = JSON.parse(highlightSource);
  
  if (index <= highlightData.urls.length) {
    res.redirect(highlightData.urls[index - 1]);
  } else {
    res.redirect("/");
  }
})

export default router;