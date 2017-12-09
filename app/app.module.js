'use strict';

// Declare app level module which depends on views, and components
angular.module('mainApp', [
        'ui.router'
        , 'ngMaterial'
        , 'ngMessages'
        , 'angularXml2json'
        , 'zhDialogs'
        , 'chart.js'
        // , 'ngTouch'
        // , 'infinite-scroll'

        , 'home'
        , 'layout'
        , 'helpers'
    ])
    .config(['$mdThemingProvider',
        function($mdThemingProvider) {
        }
    ])
