angular.module('myApp').directive('leaflet', [
    'leaflet',
    function (leaflet) {
        return {
            replace: true,
            template: '<div></div>',
            link: function (scope, element, attributes) {
                leaflet.resolve(element[0]);
            }
        };
    }
]);


