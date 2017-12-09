'use strict';
angular
    .module('mainApp')
    // .config(function($httpProvider) {
    // $httpProvider.interceptors.push(['$rootScope', '$q',
    //   function($rootScope, $q) {
    //     return {
    //       request: function(config) {
    //         config.timeout = 15000;
    //         return config;
    //       },
    //       responseError: function(rejection) {
    //         console.log("Rejection: ", rejection)
    //         if(rejection.config.url.indexOf(AppSettings.baseApiUrl) == 0) {
    //           console.log("rejection", rejection);
    //           $rootScope.$broadcast('error:ajaxService', rejection);
    //           return $q.reject(rejection);
    //         }
    //       }
    //     }
    //   }
    // ])
    // })
    .controller('mainAppCtrl', ['$scope', '$rootScope', '$state', '$window', 'ngXml2json',
        function($scope, $rootScope, $state, $window, ngXml2json) {
          var thisObj = this;

            moment.updateLocale('en', {
                relativeTime: {
                    future: function(number) {
                        // $scope.timeContext = "future";
                        // console.log(this);
                        return number;
                    },
                    past: function(number) {
                        $scope.timeContext = "past";
                        // console.log(this);
                        return number;
                    },
                    s: "%d seconds",
                    m: "1 minute",
                    mm: "%d minutes",
                    h: "1 hour",
                    hh: "%d hours",
                    d: "1 day",
                    dd: "%d days",
                    M: "1 month",
                    MM: "%d months",
                    y: "1 year",
                    yy: "%d years"
                }
            })

          $rootScope.viewMode = CONSTANTS.ZH_VIEW_MODE_DESKTOP;
          $scope.viewMode = $rootScope.viewMode;
          thisObj.setViewMode = function() {
              // console.log("[RESIZED]", $window.innerWidth);
              if($window.innerWidth <= 600){
                $rootScope.viewMode = CONSTANTS.ZH_VIEW_MODE_MOBILE;
              }
              else if($window.innerWidth > 600 && $window.innerWidth < 768){
                $rootScope.viewMode = CONSTANTS.ZH_VIEW_MODE_PHONETAB;
              }
              else{
                $rootScope.viewMode = CONSTANTS.ZH_VIEW_MODE_DESKTOP;
              }
              $scope.viewMode = $rootScope.viewMode;
          }

          thisObj.setViewMode();
          angular.element($window).bind('resize', function () {
              thisObj.setViewMode();
          });
        }
    ])
