const express = require('express');
const { Router } = require('express');
const router = Router();

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

router.get('/',async(req, res) => {
    const users = await User.find();
       res.json(users);
});

router.post('/login', async(req, res) => {
    User.findOne({
        email: req.body.user
      })
        .then(user => {
            if(user){
                if(bcrypt.compareSync(req.body.password, user.password)){
                    const payload = {
                        check:  true,
                        user_data: user
                       };

                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                      })

                    res.send(token)
                }else{
                    res.status(400).json({err:'1', message:'Contraseña incorrecta'})
                }
            }else{
                res.status(400).json({err:'2', message:'Usuario Incorrecto'})
            }
        })
        .catch(err => {
            res.status(400).json({error: err})
        })
});


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