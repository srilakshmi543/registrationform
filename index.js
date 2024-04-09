// Import required modules
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Create Express app
const app = express();

// Middleware configurations
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Database');
var db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

// Route handler for sign-up form submission
app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phno = req.body.phno;
    var gender = req.body.gender;
    var password = req.body.password;

    var data = {
        "name": name,
        "age": age,
        "email": email,
        "phno": phno,
        "gender": gender,
        "password": password
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    // Send a response indicating successful form submission
    return res.redirect('signup_successful.html');
});

// Serve index.html when root URL is requested
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    res.sendFile(__dirname + '/index.html'); // Sending the index.html file
});

// Start the server on port 3000
const PORT = process.env.PORT || 5500; 
app.listen(PORT, () => {
    console.log("Server is listening on port 5500");
});
