'use strict';

import * as fs from 'fs';
import * as express from 'express';
import {Observable} from 'rx';
import {BloggerLoadService} from '../service/BloggerLoadService';
import {TumblrLoadService} from '../service/TumblrLoadService';
import {GitHubLoadService} from '../service/GitHubLoadService'

const router = express.Router();

var bloggerLoader:BloggerLoadService = new BloggerLoadService();
var tumblrLoader:TumblrLoadService = new TumblrLoadService();
var gitHubLoader:GitHubLoadService = new GitHubLoadService();

gitHubLoader.loadQuickHitPosts()
          .subscribe(item  => {
            console.log(">> I am a post! ")

            // collection.forEach(item => {
            //   console.log(item.title);
            // })
          }, 
          err => {
            console.log(err)
          },
          () => {
            console.log(">> You're done")
          });

/**
 * Handle site root
 */
router.get('/', (req, res, next) => {
  Observable.zip(bloggerLoader.loadBloggerData(), tumblrLoader.loadTumblrData(),
    (bloggerPosts, tumblrPosts) => {
      return {
        blogger: bloggerPosts,
        tumblr: tumblrPosts
      };
    })
    .subscribe((result) => {
      res.render('index', {
        bloggerPosts: result.blogger,
        tumbrlPosts: result.tumblr
      });
    })
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