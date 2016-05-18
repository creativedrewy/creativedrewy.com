'use strict';

import * as express from 'express';
import * as blogger from '../service/BloggerLoadService';

const router = express.Router();

var bloggerLoader:blogger.BloggerLoadService = new blogger.BloggerLoadService();

/**
 * Handle site root route
 */
router.get('/', (req, res, next) => {
  res.render('index', { title: '{creative:drewy}' });
});

export default router;
