var express = require('express')
var app = express();
var chrono = require('chrono-node')

var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

app.get('/:dateString', function (req, res) {
    var tryNum = Number(req.params.dateString);
    var date;
    if(!isNaN(tryNum) && tryNum>=0 && tryNum%1==0){
        date = new Date(tryNum * 1000);
    }else{
        var chDate = chrono.parseDate(req.params.dateString); 
        if(chDate)date = new Date(chDate);
    }
    if(date){
        res.send({ "unix": date.getTime()/1000, "natural": monthNames[date.getMonth()] +" " + date.getDate() + ", " + date.getFullYear()});
    }else{
        res.send({ "unix": null, "natural": null });
    }
});

app.listen(8080);