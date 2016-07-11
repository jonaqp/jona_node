var express = require('express');
var router = express.Router();

var Group = require('./../models/core_models').group;

router.get('/', function (req, res, next) {
    res.send('respond with a resource not found')
});

router.route('/group')
	.post(function(req, res){
		var group = new Group();
		group.name = req.body.name;
        group.status = req.body.status != 'enabled' ? false : true;
		group.save(function(err){
			if(err) res.send(err);
			res.json(group);
		});
	})
	.get(function(req, res){
		Group.find(function(err, group) {
            if (err) res.send(err);
            res.json(group);
        });
	});

router.route('/group/:id')
    .get(function(req, res) {
        Group.findById(req.params.id, function(err, group) {
            if (err)res.send(err);
            res.json(group);
        });
    })
    .put(function(req, res) {
        Group.findById(req.params.id, function(err, group) {
            if (err) res.send(err);
            group.name = req.body.name;
		    group.status = req.body.status != 'enabled' ? false : true;
            group.save(function(err) {
                if (err) res.send(err);
                res.json(group);
            });
        });
    })
	.delete(function(req, res) {
        Group.findById({
            _id: req.params.id
        }, function(err, group) {
            if (err) res.send(err);
            res.json(group);
        });
    });


module.exports = router;

