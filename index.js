require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config.js');
const cors = require('cors');


//Servidor de express

const app = express();

//Base de datos

dbConnection();

// CORS segurity

app.use(cors());

// Directorio publico

app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

//Rutas

//auth // crear, login, renew
app.use('/api/auth', require('./routes/auth.js') );
app.use('/api/events', require('./routes/events.js') );
app.use('/api/posts', require('./routes/posts.js') );
app.use('/api/search', require('./routes/search.js') );
app.use('/api/user', require('./routes/user.js') );



app.get('*', ( req, res ) => {
    res.sendFile(__dirname + '/public/index.html');
})

//Peticiones

app.listen( process.env.PORT, () => {
    console.log(`Servidor ok en puerto ${process.env.PORT}`)
} )