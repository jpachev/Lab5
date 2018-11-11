var express = require('express');
var router = express.Router()

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB',{ useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});
;

/* GET home page. */


router.post('/comment', function(req, res, next) {
console.log("POST comment route");
console.log(req.body);
var newcomment = Comment(req.body);
newcomment.save(function(err, result){
    if(err) {console.log("Error"); res.sendStatus(500);}
    else{
       res.sendStatus(200);    
    }
})
});

router.get('/comment', function(req, res, next) {
    console.log("In the GET route?");
    console.log(req.query)
     var name = req.query["q"];
     console.log("Name="+name);
    
     var obj={};
     if (name){
       obj= {Name:new RegExp("^"+name)};
     }
     console.log("Obj",obj);
    Comment.find(obj, function(err,commentList) { //Calls the find() method on your databa
        console.log("Commentlist: "+commentList);
        res.json(commentList);
    })
});


router.delete('/comment', function(req, res,next){
  Comment.find().remove(function(err){
      if(err)
      {
          res.sendStatus(500);
          return;
      }
      res.sendStatus(200);
  })
  
})




module.exports = router;
