// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// <My code>
const apiDateHandler = (req, res) => {
  let dateObj;
  if (!req.params.date) {
    dateObj = new Date();
  } else {
    dateObj = new Date(req.params.date);
  }

  if (dateObj.toString() === "Invalid Date") {
    dateObj = new Date(parseInt(req.params.date));
  } 

  if(dateObj.toString() === "Invalid Date") {
    res.json({error : "Invalid Date"});
  } else {
    const utcVal = dateObj.toUTCString();
    const unixVal = dateObj.getTime();
    res.json({"unix": unixVal, "utc": utcVal});
  }
}

app.use("/api/:date?", apiDateHandler);
// <My Code/>


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


