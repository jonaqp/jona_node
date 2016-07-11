angular.module('myApp', ['ngRoute', 'leaflet-directive']).controller('ViewerController',
    ['$scope', '$http', 'leafletData',
        function ($scope, $http, leafletData) {

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
