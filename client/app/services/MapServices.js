angular.module('myApp').factory('leaflet', [
    '$q',
    function ($q) {
        var deferred = $q.defer();
        return {
            map: deferred.promise,
            resolve: function (element) {
                deferred.resolve(new L.Map(element));
            }
        }
    }
]);
