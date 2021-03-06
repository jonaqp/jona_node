angular.module('myApp').controller('CameraController',
    ['$scope', '$http',
        function ($scope, $http) {
            $scope.options_status = [{ name: "enabled", id: 1 }, { name: "disabled", id: 2 }];
            $scope.params = {};
            $scope.render1 = true;
            $scope.render2 = false;


            var refresh = function () {
                $http.get('/api/camera').success(function (data) {
                    $scope.cameralist = data;
                    $scope.camera = "";
                });
            };
            refresh();


            $scope.addGroup = function () {
                $http.post('/api/camera', $scope.group).success(function (data) {
                    console.log(data);
                    refresh();
                });
            };

            $scope.remove = function (id) {
                $http.delete('/api/camera/' + id).success(function (data) {
                    refresh();
                });
            };

            $scope.edit = function (id) {
                $http.get('/api/camera/' + id).success(function (data) {
                    $scope.camera = data;
                    $scope.render1 = false;
                    $scope.render2 = true;
                    $scope.params.value = $scope.options_status[1].name;
                    if (data.status == true){
                        $scope.params.value = $scope.options_status[0].name;
                    }
                });
            };

            $scope.update = function () {
                $http.put('/api/camera/' + $scope.camera._id, $scope.camera).success(function (data) {
                    refresh();
                    $scope.exit();
                })
            };
            $scope.exit = function () {
                $scope.deselect();
                $scope.render1 = true;
                $scope.render2 = false;
            };

            $scope.deselect = function () {
                $scope.camera = "";
            }


        }]);
