var db_string = 'mongodb://127.0.0.1/db_auth';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error while connecting to database'));

db.once('open', function() {
   var userSchema = mongoose.Schema({

       username: String,
       password: String,
       created_at: Date
   });
   exports.User = mongoose.model('User', userSchema);
});