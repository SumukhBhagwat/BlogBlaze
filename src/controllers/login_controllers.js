

'use strict';

/**
 *  node modules
 */

const bcrypt = require('bcrypt');

/**
 * 
 * custom modules
 */
const User = require('../models/user_model');


/**
 * Render the login page
 * 
 * @param {object} req - the HTTP request object 
 * @param {object} res - the HTTP response object
 */

const renderLogin = (req,res) => {

    const { userAuthenticated } = req.session.user || {};
    console.log(req.session.user);

    // case where user already logged in
    if(userAuthenticated){
        return res.redirect('/');
    }

    res.render('./pages/login');
}

/**
 * Handles the login process for a new user.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} - A Promise that represents the asynchronous operation
 */

const postLogin = async (req, res) =>{
    try{

            //  extract email and password from user
            const{email, password} = req.body;

            //  find user database by email
            const currentUser = await User.findOne( { email } );
            
            
            if(!currentUser){

                return res.status(400).json({message : 'No user with this email address has been found. '});
            }


            //  check whether password is valid or not
             const passwordIsValid = await bcrypt.compare(password, currentUser.password);

             if(!passwordIsValid){

                return res.status(400).json({message : 'Incorrect password. '});
            }

            // set session userAuthenticated to true and redirect to homepage
            req.session.user = {
                userAuthenticated: true,
                name: currentUser.name,
                username: currentUser.username,
                profilePhotoURL: currentUser.profilePhoto?.url 
            }
                return res.redirect('/')

    } catch(error){
        console.log('postLogin: ', error.message);
        throw(error);
    }
}

module.exports = {
    renderLogin, postLogin
}