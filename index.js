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
app.get("/api/:date?", function (req, res) {
  let date_string = req.params.date;
  let date, unix;
  if ((/\d{13}/).test(date_string)) {
    unix = parseInt(date_string);
    date = new Date(unix);
    res.json({
      "unix": unix,
      "utc": date.toUTCString()
    })
  } else if ((/(197[0-9]|19[89][0-9]|[2-9][0-9]{3})-([1-9]|[12][0-9]|3[01])/).test(date_string)) {
    date = new Date(date_string);
    validDateCheck = date.getTime();
    if (isNaN(validDateCheck)) {
      res.json({
        "error": "Invalid Date"
      })
    } else {
        unix = date.getTime();
        res.json({
          "unix": unix,
          "utc": date.toUTCString()
        })
    }
  } else if ((/([1-9]|[12][0-9]|3[01])\s\w+\s(197[0-9]|19[89][0-9]|[2-9][0-9]{3})/).test(date_string)) {
    if (!((/GMT|UTC/).test(date_string))) {
      date_string = `${date_string} 00:00:00 GMT`;
    }
    unix = Date.parse(date_string);
    date = new Date(unix);
    res.json({
      "unix": unix,
      "utc": date.toUTCString()
    })
  } else if (!(date_string)) {
    date = new Date();
    res.json({
      "unix": date.getTime(),
      "utc": date.toUTCString()
    })
  } else {
    res.json({
      "error": "Invalid Date"
    })
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
