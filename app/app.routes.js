// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular
    .module('mainApp')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$urlMatcherFactoryProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {


                // Configure AngularJS stateProvider to allow '/' in URL
                (function() {
                    function valToString(val) {
                        return val !== null ? val.toString() : val;
                    } //.replace("%252F", "").toString()
                    function valFromString(val) {
                        return val !== null ? val.toString() : val;
                    } //.replace("%2F", "").toString()
                    function regexpMatches(val) { /*jshint validthis:true */
                        return this.pattern.test(val);
                    }
                    $urlMatcherFactoryProvider.type('string', {
                        encode: valFromString,
                        decode: valFromString,
                        is: regexpMatches,
                        pattern: /[^/]*/
                    });
                })();



                // $locationProvider.html5Mode(true);
                // $locationProvider.hashPrefix('!');

                // if none of the above states are matched, use this as the fallback
                $urlRouterProvider.otherwise('/');
                console.log("$stateProvider", $stateProvider.state);

                $stateProvider
                    .state('app', {
                        url: '/',
                        abstract: true,
                        controller: 'mainAppCtrl'
                    })
                    .state('app.home', {
                            url: '',
                            cache: true,
                            views: {
                                'contentSection@': {
                                    templateUrl: 'screens/home/home.template.html',
                                    controller: 'homeController',
                                    controllerAs: 'thisObj'
                                }
                            }
                          })
                    }]);
