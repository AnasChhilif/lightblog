const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const business = require('../business/business.js');
const app = express();

const apiServ = {
    start : function(port) {
        app.use(bodyParser.json());
        app.use(cors());

        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            next();
        });

        app.post('/login', function(req, res) {
            business.login(req.body.username, req.body.password, function(err, sessionToken) {
                if (err) {
                    console.log(err);
                    res.status(500).send();
                } else {
                    res.status(200).send({sessionToken: sessionToken});
                }
            }
        )});

        app.get('/posts', function(req, res) {
            business.getAllPosts(function(err, posts) {
                if (err) {
                    console.log(err);
                    res.status(500).send();
                } else {
                    res.status(200).send(posts);
                }
            }
        )});

        app.listen(port, function() {
            console.log('Server listening on port ' + port);
        }
    )},
}

module.exports = apiServ;
