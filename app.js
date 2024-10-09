/*
       (For Beginning Stage)
register
login
home
create blog

*/


'use strict';

/** node modules   */ 
const express= require('express');
require('dotenv').config();

const session = require('express-session');
const MongoStore = require('connect-mongo');


/*
custom modules
*/

const register = require('./src/routes/register_route');
const login = require('./src/routes/login_route');
const { connectDB, disconnectDB } = require('./src/config/mongoose_config');
const home = require('./src/routes/home_route');
const createBlog = require('./src/routes/create_blog_route');




/* 
  initialising express   
  */
const app= express();


/*
 rendering view engine for register page 
*/
app.set('view engine', 'ejs');

/**
 * set public directory
 */
app.use(express.static(`${__dirname}/public`));

/**
 * parse urlencoded body
 */
app.use(express.urlencoded({ extended: true }));

/**
 *    instance for session storage
 */
const store = new MongoStore({
  mongoUrl: process.env.MONGO_CONNECTION_URI,
  collectionName: 'sessions',
  dbName: 'BlogBlaze' 
});

/**
 *   initial express session
 */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
  cookie:{
     maxAge: Number(process.env.SESSION_MAX_AGE)
  }
}));



/*
  register page
*/ 
app.use('/register', register);

/*
  login page
*/ 
app.use('/login', login);


/**
 *  home page 
 */
app.use('/', home);

/**
 *  create blog page 
 */
app.use('/createblog', createBlog);



//starting a server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
  console.log(`Server listening on port http://localhost:${PORT}`);

  await connectDB(process.env.MONGO_CONNECTION_URI);
});












