angular.module('app')
    .directive('myvideo', ppTv);

function ppTv() {
    return {
        restrict: 'E',
        scope: {
            playlistUrl: '@playurl'
        },
        link: function (scope, element, attributes) {
            attributes.$observe('playurl', function(value) {
                jwplayer('myvideo').setup({
                    file: value,
                    image: '@channelLogo',
                    primary: 'flash',
                    autostart: true,
                    fallback: true,
                    androidhls: true,
                    type: 'hls'
                });

            })

        }
    };
}
