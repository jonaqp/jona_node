var express = require('express');
var router = express.Router();

var Container = require('./../models/container_models');

router.get('/', function (req, res, next) {
    res.send('respond with a resource not found')
});


router.get('/boat', function(req, res) {
    Container.boat.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/trip/:mac_address', function (req, res) {
    var mac_address = req.params.mac_address;
    Container.trip.find({mac_address: mac_address}, {"_id":0, "date":1}, function (e, docs) {
        res.json(docs);
    });
});

router.get('/trip/:mac_address/:trip_date/image', function (req, res) {
    var mac_address = req.params.mac_address;
    var trip_date = req.params.trip_date;
    Container.trip.find({date: trip_date, mac_address: mac_address}, {"_id":0, "image":1}, function (e, docs) {
        res.json(docs);
    });
});

router.get('/trip/:mac_address/:trip_date/json', function (req, res) {
    var mac_address = req.params.mac_address;
    var trip_date = req.params.trip_date;
    Container.trip.find({date: trip_date, mac_address: mac_address}, {"_id":0, "json_filepath":1}, function (e, docs) {
        res.json(docs);
    });
});




router.route('/camera')
	.post(function(req, res){
		var camera = new Container.boat();
		camera.mac_address = req.body.mac_address;
        camera.status = req.body.status != 'enabled' ? false : true;
		camera.save(function(err){
			if(err) res.send(err);
			res.json(camera);
		});
	})
	.get(function(req, res){
		Container.boat.find(function(err, camera) {
            if (err) res.send(err);
            res.json(camera);
        });
	});

router.route('/camera/:id')
    .get(function(req, res) {
        Container.boat.findById(req.params.id, function(err, camera) {
            if (err)res.send(err);
            res.json(camera);
        });
    })
    .put(function(req, res) {
        Container.boat.findById(req.params.id, function(err, camera) {
            if (err) res.send(err);
            camera.mac_address = req.body.mac_address;
		    camera.status = req.body.status != 'enabled' ? false : true;
            camera.save(function(err) {
                if (err) res.send(err);
                res.json(camera);
            });
        });
    })
	.delete(function(req, res) {
        Container.boat.findById({
            _id: req.params.id
        }, function(err, camera) {
            if (err) res.send(err);
            res.json(camera);
        });
    });


module.exports = router;