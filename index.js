
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();  
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors')

//inicializacion 
const app = express();
app.use(cors())
require('./database');

//puerto
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime()+ path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));

//Routes
app.use(require('./routes/index.js'))

//Static files
app.use(express.static(path.join(__dirname,'public')));

//empezar servidor
app.listen(app.get('port'), ()=>{
    console.log('El puerto se encuentra en ', app.get('port'));
});