// Load Node modules
var express = require('express');
var bodyParser = require('body-parser')
// Initialise Express
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));

const fs = require('fs');
const hostname = '127.0.0.1';
const port = 8000;

app.post('/addComment',(req,res) => {
    console.log("AddComment: ", req.body);
    var userName = req.body.userName;
    var comment = req.body.comment;
    fs.appendFile('comments.csv', `${userName},${comment}\n`, function (err) {
        if (err){
            res.status(500).json({message: "", error: "Internal server error"});
        } else{
            console.log('Saved!');
            res.status(200).json({message: "Saved", error: ""});
        }
    });
});

app.get('/comments',function(req,res){
    commentsFilePath = `${__dirname}/comments.csv`
    console.log(`Sending comments file at ${commentsFilePath}`)
    res.sendFile(commentsFilePath);
});

// Port website will run on
app.listen(port, hostname, () => {
    console.log(`app running at http://${hostname}:${port}/`);
});