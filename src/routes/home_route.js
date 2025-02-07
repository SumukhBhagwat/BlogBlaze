

'use strict';

/**
 Node modules
 */
 const router  = require('express').Router();

 /*
   custom modules
 */
const renderHome = require('../controllers/home_controller');
   

 // GET route to render home page
 router.get('/', renderHome);

// GET route: Render the home page.
router.get(['/', '/page/:pageNumber'], renderHome);


 module.exports = router;
