angular.module('myApp').controller('ViewerController',
    ['$scope', '$http', 'leaflet',
        function ($scope, $http, leaflet) {

            var refresh = function () {
                $http.get('/api/boat')
                    .success(function (data) {
                        console.log("boar", data);
                        $scope.boats = data;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });

            };
            refresh();

            $scope.BoatChange = function (mac_address) {
                if (mac_address == '0') {
                    $('#alert-boat').html('seleccione').show().delay(800);
                    $scope.trips = {}
                } else {
                    $('#alert-boat').html('').hide();
                    LoadTrip($scope, $http, mac_address)
                }
            };

            var LoadTrip = function ($scope, $http, mac_address) {
                $http.get('/api/trip/' + mac_address)
                    .success(function (data) {
                        $scope.trips = data;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            };

            $scope.TripChange = function (trip_date) {
                if (trip_date == '0') {
                    $('#alert-trip').html('seleccione').show().delay(800);
                } else {
                    $('#alert-trip').html('').hide();
                    var mac_address = $('#id_mac').val();
                    LoadImageFile($scope, $http, mac_address, trip_date)
                }
            };

            var LoadImageFile = function ($scope, $http, mac_address, trip_date) {
                $http.get('/api/trip/' + mac_address + '/' + trip_date + '/image')
                    .success(function (data) {
                        $scope.image_list = data;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            };

            leaflet.map.then(function (map) {
                var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';
                var grayscale = L.tileLayer(mbUrl, {id: 'mapbox.light'}),
                    streets = L.tileLayer(mbUrl, {id: 'mapbox.streets'});
                var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
                    maxZoom: 15,
                    layers: [grayscale],
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
                }).addTo(map);
                var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                    maxZoom: 15,
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                });
                var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
                    maxZoom: 15,
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                });
                var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                    maxZoom: 15,
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                });
                var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
                    maxZoom: 15,
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                });
                var baseLayers = {
                    "Grayscale": grayscale,
                    "Streets": streets,
                    "G. Streets": googleStreets,
                    "G. Hybrid": googleHybrid,
                    "G. Satelital": googleSat,
                    "G. Terrain": googleTerrain
                };
                map.setView([0, 0], 1);
                L.control.layers(baseLayers).addTo(map);

            });
            // var LoadPointFile = function ($scope, $http, mac_address, trip_date) {
            //     $http.get('/api/trip/' + mac_address + '/' + trip_date + '/json')
            //         .success(function (data) {
            //             $scope.json_file = data;
            //         })
            //         .error(function (data) {
            //             console.log('Error: ' + data);
            //         });
            // };


            // var test = function () {
            //     var url = 'http://s3-us-west-2.amazonaws.com/jonap/74da382aeca7_2015-08-10.json?callback=JSON_CALLBACK';
            //     $http.get(url).
            //         success(function(data, status, headers, config) {
            //           $scope.posts = data;
            //             var plArray = [];
            //             for (var i = 0; i < data.length; i++) {
            //                 // console.log(data[i].longitude, data[i].latitude);
            //                 plArray.push(L.polyline([data[i].longitude, data[i].latitude]).addTo(map));
            //             }
            //         }).
            //         error(function(data, status, headers, config) {
            //           // log error
            //         });
            //
            // };
            // test()
        }]);

