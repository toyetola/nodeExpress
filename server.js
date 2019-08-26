const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))


app.use(bodyParser.json())
const dbConfig = 'mongodb+srv://oyetola:oyetola24@notedb-qwcae.mongodb.net/test?retryWrites=true&w=majority';
// const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connecting to the database
mongoose.connect(dbConfig, {
    useNewUrlParser : true
});/* .then(()=>{
    console.log("Successfully connected to the database")
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
}); */

mongoose.connection.once('open', function(){
      console.log('Conection has been made!');
    }).on('error', function(error){
        console.log('Error is: ', error);
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes"})
});

require('./app/routes/note.routes.js')(app);

//listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

