const express = require('express');
const { Router } = require('express');
const router = Router();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/UserController');
const User = require('../models/User');


const routesProtected = express.Router();

routesProtected.use((req, res, next) =>{
    const token = req.headers.token;
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) =>{
            if(err){
                res.json({message:'Token Inválida.'});
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        res.status(400).json({message:'No se envio Token.'});
    }
});

router.get('/', userController.getUsers);

router.post('/login', userController.Login);


router.get('/login/google', async() =>{
  
    new GoogleStrategy({
        //Options for the google strat
        callbackURL: "/auth/google/redirect",
        clientID:process.env.clientID,
        clientSecret: process.env.clientSecret
      },
      (accesstoken, refeshToken, profile,email, done) => {
          console.log(email);
          var email = email.emails[0].value;
          user.findOne({ email }, (err, usuario) => {
            if (!usuario) {
              return done(null, false, {
                message: `Email ${email} no esta registrado`
              });
            } else {
               
                  return done(null, usuario); 
            }
          });
      }
      )
    
})

module.exports = router;