var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/partials/home.html',
            access: {restricted: true}
        })
        .when('/login', {
            templateUrl: 'templates/partials/login.html',
            controller: 'loginController',
            access: {restricted: false}
        })
        .when('/logout', {
            controller: 'logoutController',
            access: {restricted: true}
        })
        .when('/register', {
            templateUrl: 'templates/partials/register.html',
            controller: 'registerController',
            access: {restricted: false}
        })
        .when('/viewer', {
            templateUrl: 'templates/pages/viewer.html',
            controller: 'ViewerController',
            access: {restricted: true}
        })
        .when('/camera', {
            templateUrl: 'templates/pages/camera.html',
            controller: 'CameraController',
            access: {restricted: true}
        })
        .when('/group', {
            templateUrl: 'templates/pages/group.html',
            controller: 'GroupController',
            access: {restricted: true}
        })
        .otherwise({
            redirectTo: '/'
        });
});

myApp.run(function ($rootScope, $location, $route, AuthService) {
    $rootScope.$on('$routeChangeStart',
        function (event, next, current) {
            AuthService.getUserStatus()
                .then(function () {
                    if (next.access.restricted && !AuthService.isLoggedIn()) {
                        $location.path('/login');
                        $route.reload();
                    }
                });
        });
});