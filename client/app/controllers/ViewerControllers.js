angular.module('myApp').controller('ViewerController',
    ['$scope', '$http', 'leaflet',
        function ($scope, $http, leaflet) {

            $scope.s3 = 'https://shellcatch.s3.amazonaws.com';
            $scope.movie = "";
            var refresh = function () {
                $http.get('/api/boat')
                    .success(function (data) {
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
                    LoadPointFile($scope, $http, mac_address, trip_date);
                    video_file($scope, $http, mac_address, trip_date);
                }
            };
            var LoadPointFile = function ($scope, $http, mac_address, trip_date) {
                $http.get('/api/trip/' + mac_address + '/' + trip_date + '/json')
                    .success(function (data) {
                        $scope.path_json = data[0].json_filepath.toString();
                        $scope.json_file = $scope.s3 + "/" + $scope.path_json;
                        console.log($scope.json_file);
                        $http.get($scope.json_file)
                            .success(function (data) {
                                $scope.point = data;
                                load_map($scope, data)
                            })
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            };

            var video_file = function($scope, $http, mac_address, trip_date){
                  $http.get('/api/trip/' + mac_address + '/' + trip_date + '/video')
                    .success(function (data) {
                        console.log("data", data);
                        $scope.path_video = data[0].video_filepath.toString();
                        $scope.video_file = $scope.s3 + "/" + $scope.path_video;
                        // $scope.movie = $scope.video_file
                        $scope.movie = data[0].video_filepath.toString();
                        $scope.playlistUrl = data[0].video_filepath.toString();

                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            };

            var load_map = function ($scope, data) {
                leaflet.map.then(function (map) {
                    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';
                    var grayscale = L.tileLayer(mbUrl, {id: 'mapbox.light'}),
                        streets = L.tileLayer(mbUrl, {id: 'mapbox.streets'});
                    var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
                        maxZoom: 25,
                        layers: [grayscale],
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
                    }).addTo(map);
                    var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                        maxZoom: 25,
                        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                    });
                    var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
                        maxZoom: 25,
                        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                    });
                    var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                        maxZoom: 25,
                        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                    });
                    var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
                        maxZoom: 25,
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
                    map.setView([0, 0], 5);
                    L.control.layers(baseLayers).addTo(map);

                    var new_cord = [];

                    for (var i = 0; i < data.length; i++) {
                        var latitude = parseFloat(data[i].latitude);
                        var longitude = parseFloat(data[i].longitude);
                        if (!(isNaN(latitude) || isNaN(longitude))) {
                            var latlng = L.latLng(latitude, longitude);
                            new_cord.push(latlng);
                        }
                    }
                    var markerLine = L.polyline(new_cord).addTo(map);
                    L.polylineDecorator(markerLine, {
                        patterns: [
                            {
                                offset: 25,
                                repeat: 50,
                                symbol: L.Symbol.arrowHead({pixelSize: 15, pathOptions: {fillOpacity: 1, weight: 0}})
                            }
                        ]
                    }).addTo(map);
                    map.fitBounds(markerLine.getBounds());

                });

            };


        }]);
