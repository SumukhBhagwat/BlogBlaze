/**
 Node modules
 */

 const router  = require('express').Router();

 /*
   custom modules
 */

   const {renderRegister, postRegister} = require('../controllers/register_controllers');

 // GET route options using Router funtion to create a register form
 router.get('/', renderRegister);

  // POST route options using Router funtion to create a register form
  router.post('/', postRegister);


 module.exports = router;
