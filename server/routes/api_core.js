var restful = require('node-restful');
var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.send('respond with a resource not found')
});
//
// router.get('/boat', function(req, res) {
//     Container.boat.find({},{},function(e,docs){
//         res.json(docs);
//     });
// });

// Models
var Group = require('./../models/core_models').api_group;
Group.methods(['get', 'put', 'post', 'delete']);
Group.register(router, '/group');
