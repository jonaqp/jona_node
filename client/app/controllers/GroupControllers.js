angular.module('myApp').controller('GroupController',
    ['$scope', '$http', 'AuthService',
        function ($scope, $http, AuthService) {
            var vm = this;
            vm.isLoggedIn = AuthService.isLoggedIn();
            // vm.currentUser = AuthService.currentUser();
            console.log(vm.isLoggedIn);

            $scope.options_status = [{ name: "enabled", id: 1 }, { name: "disabled", id: 2 }];
            $scope.params = {};
            $scope.render1 = true;
            $scope.render2 = false;


            var refresh = function () {
                $http.get('/api/group').success(function (data) {
                    $scope.grouplist = data;
                    $scope.group = "";
                });
            };
            refresh();


            $scope.addGroup = function () {
                $http.post('/api/group', $scope.group).success(function (data) {
                    console.log(data);
                    refresh();
                });
            };

            $scope.remove = function (id) {
                $http.delete('/api/group/' + id).success(function (data) {
                    refresh();
                });
            };

            $scope.edit = function (id) {
                $http.get('/api/group/' + id).success(function (data) {
                    $scope.group = data;
                    $scope.render1 = false;
                    $scope.render2 = true;
                    $scope.params.value = $scope.options_status[1].name;
                    if (data.status == true){
                        $scope.params.value = $scope.options_status[0].name;
                    }
                });
            };

            $scope.update = function () {
                $http.put('/api/group/' + $scope.group._id, $scope.group).success(function (data) {
                    refresh();
                })
            };
            $scope.exit = function () {
                $scope.deselect();
                $scope.render1 = true;
                $scope.render2 = false;
            };

            $scope.deselect = function () {
                $scope.group = "";
            }


        }]);
