'use strict';
import { Z_ERRNO } from 'zlib';
import { PostDetails } from '../model/PostDetails';

import * as fs from 'fs';
import * as express from 'express';
import {Observable} from 'rx';
import {GitHubLoadService} from '../service/GitHubLoadService'

const router = express.Router();

var gitHubLoader:GitHubLoadService = new GitHubLoadService("##");

/**
 * Handle site root
 */
router.get('/', (req, res, next) => {
  gitHubLoader.loadQuickHitPosts()
    .subscribe((result) => {
      res.render('index', {
        mainPosts: result,
        tumbrlPosts: Array()
      });
    })
})

/**
 * Load an article from the relevant source as well as the sidebar content
 */
router.get('/article/:permalink', (req, res, next) => {
  var urlParts = req.params['permalink'].split("-");
  //var articleSource = urlParts[urlParts.length - 2];  //Get the "source" value
  var articleId = urlParts[urlParts.length - 1];  //Get the article id

  gitHubLoader.loadPostById(articleId)
  .subscribe(result => {
    res.render('article', {
      articlePost: result,
      tumbrlPosts: Array()
    });
  },
  err => res.redirect("/"))
});

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