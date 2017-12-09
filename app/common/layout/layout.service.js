angular
    .module('layout')
    // Remove $q once the AJAX service is ready
    .service('layoutService', ['ajaxService', '$q', '$rootScope', function(ajaxService, $q, $rootScope) {
        var self = this;
    }])
