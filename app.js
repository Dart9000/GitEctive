require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var https = require('https');

const port = 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let repoData = {};
let repoName = '';
let copyPer = -1;

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/analyze", (req, res) => {
  res.render("analyze", {repoData: repoData, repoName: repoName});
});

app.post("/analyze", (req, res) => {
  const url = req.body.repoURL;
  const arr = url.split("/");
  repoName = arr.pop();

  const options = {
    hostname: 'inspect-api.herokuapp.com',
    port: 443,
    path: `/analysis?url=${url}`,
    method: 'GET'
  }

  const request = https.request(options, responce => {
  console.log(`statusCode: ${responce.statusCode}`)

  responce.on('data', d => {
      const data = JSON.parse(d);
      repoData = data;
      res.redirect("/analyze");
    })
  })

  request.on('error', error => {
    console.error(error)
  })

  request.end();
});

app.get("/compare", (req, res) => {
  res.render("compare", {copyPer: copyPer});
});

app.post("/compare", (req, res) => {
  const repo = {url1: req.body.repoURL1, url2: req.body.repoURL2};

  const options = {
    hostname: 'inspect-api.herokuapp.com',
    port: 443,
    path: `/compare?url1=${repo.url1}&url2=${repo.url2}`,
    method: 'GET'
  }

  const request = https.request(options, responce => {
  console.log(`statusCode: ${responce.statusCode}`)

  responce.on('data', d => {
      const data = JSON.parse(d);
      copyPer = data;
      res.redirect("/compare");
    })
  })

  request.on('error', error => {
    console.error(error)
  })

  request.end();
});

app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`);
});
