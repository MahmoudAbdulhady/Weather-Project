const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/" , function (req , res)
{
  res.sendFile(__dirname + "/search.html");
});

app.post("/" , function(req , res)
{
  const query = req.body.cityName;
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=metric&appid=182d2d87c36e1ec4543c0fc667cf00ac";
  https.get(url , function(response)
  {
    console.log(response.statusCode);
    response.on("data" , function(data)
    {
      const weatherinfo = JSON.parse(data);
      const temp = weatherinfo.main.temp;
      const tempDescription = weatherinfo.weather[0].description;
      res.write("<h1>The temperature in " +query+ " is " + temp + " Degrees Celisus</h1>");
      res.write("the description is: "+ tempDescription);
      console.log(query);
      res.send();
    });
  });
});



app.listen(port , function()
{
  console.log("server is up and Running on port 3000");
});
