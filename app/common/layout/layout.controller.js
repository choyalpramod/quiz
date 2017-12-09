angular
    .module('layout', [])
    .config(function($mdIconProvider) {
        $mdIconProvider
            .defaultIconSet('img/icons/sets/core-icons.svg', 24);
    })
    .filter('keyboardShortcut', function($window) {
        return function(str) {
            if (!str) return;
            var keys = str.split('-');
            var isOSX = /Mac OS X/.test($window.navigator.userAgent);

            var seperator = (!isOSX || keys.length > 2) ? '+' : '';

            var abbreviations = {
                M: isOSX ? '⌘' : 'Ctrl',
                A: isOSX ? 'Option' : 'Alt',
                S: 'Shift'
            };

            return keys.map(function(key, index) {
                var last = index == keys.length - 1;
                return last ? key : abbreviations[key];
            }).join(seperator);
        };
    })
    .controller('layoutController', [
      '$rootScope',
        '$scope',
        // '$log',
        '$state',
        // '$timeout',
        // '$location',
        // 'menu',
        // '$mdSidenav',
        // '$mdUtil',
        '$sce',
        '$mdDialog',
        function($rootScope, $scope, $state, $sce, $mdDialog) { //, $log, $state, $timeout, $location, menu, $mdSidenav, $mdUtil, $mdDialog, ajaxService) {
            var thisObj = this;
            console.log("$rootScope", $rootScope);
            thisObj.decodeURIComponent = function(urlParam) {
            //   // console.log("[urlParam]", urlParam, decodeURIComponent(urlParam));
              var urlParam = decodeURIComponent(urlParam);
              urlParam = urlParam.replace(/\//g, "\/");
              return (urlParam);
            }
            console.log("[layoutController STATE]", $state.current);
        }
    ])
