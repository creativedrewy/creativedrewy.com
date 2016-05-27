'use strict';

import * as fs from 'fs';
import * as express from 'express';
import {Observable} from 'rx';
import {BloggerLoadService} from '../service/BloggerLoadService';
import {TumblrLoadService} from '../service/TumblrLoadService';

const router = express.Router();

var bloggerLoader:BloggerLoadService = new BloggerLoadService();
var tumblrLoader:TumblrLoadService = new TumblrLoadService();

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

router.get('/highlight/:id', (req, res, next) => {
  var index = parseInt(req.params['id']);
  var highlightSource:string = fs.readFileSync("highlights.json", "UTF-8");
  
  var highlightData = JSON.parse(highlightSource);
  
  res.send('highlight ' + highlightData.urls[index]);
})

export default router;