'use strict';

import * as express from 'express';
import * as blogger from '../service/BloggerLoadService';

const router = express.Router();

var bloggerLoader:blogger.BloggerLoadService = new blogger.BloggerLoadService();

/**
 * Handle site root
 */
router.get('/', (req, res, next) => {
  bloggerLoader.loadBloggerData()
    .then((posts) => {
      res.render('index', {
        bloggerPosts: posts
      });
    })
});

/**
 * "Dynamic" bio js that can be embedded elsewhere
 */
router.get('/bio.js', (req, res, next) => {
  res.send("document.write('Principal Android and Interactive developer in Austin, TX. If it\\'s a cool project, I probably want to work on it.');");
})

//TODO: Routes to handle:
//@get '/highlight/:id':
//@get '/downloads/:file':

export default router;
