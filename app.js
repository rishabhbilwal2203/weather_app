const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    const cityName = req.body.cityName;
    const countryName = req.body.countryName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "," + countryName + "&appid=680a3dd8d07fb98735bcb2994fa2dae1&units=metric";

    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const feelsLike = weatherData.main.feels_like;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>Tempertature in "+ cityName + " is "+ temp+" C</h1>");
            res.write("<h1>Feels like " + feelsLike + " C</h1>")
            res.write("<h2>description about weather :  " + description + "</h2>")
            res.write("<img src=" + imgURL + ">");
            res.send();
        })
    });
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
});