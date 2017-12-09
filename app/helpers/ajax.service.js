angular
  .module('helpers', ['angularXml2json'])
  .service('ajaxService', ['$http', '$q', '$httpParamSerializer', '$interpolate', '$httpParamSerializer', '$timeout', '$rootScope', 'ngXml2json',
  function($http, $q, $httpParamSerializer, $interpolate, $httpParamSerializer, $timeout, $rootScope, ngXml2json) {
    this.appendTransform = function(defaults, transform) {
      defaults = angular.isArray(defaults) ? defaults : [defaults];

      // Append the new transformation to the defaults
      return defaults.concat(transform);
    }

    this.doPost = function(urlProvider, paramData, queryStringData) {
      var def = $q.defer();

      var url = ApiPaths.getPath(urlProvider);
      url = $interpolate(url)(queryStringData);

      paramData = $httpParamSerializer(paramData);

      $rootScope.$broadcast("show:loading");
      $http({
        method: "POST",
        url: url,
        // cache: true,
        transformResponse: this.appendTransform($http.defaults.transformResponse, function(response, headers) {
          try {
            return ngXml2json.parser(response);
          } catch (ex) {
            // console.log("CONVERSION EXCEPTION", ex);
            return response;
          }
        }),
        withCredentials:true,

        data: paramData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then(function(response, status, headers, config) {
        console.log(response, status, headers, config);
          $rootScope.$broadcast("hide:loading");
          def.resolve(response);
        },
        function(response) {
          // ERR_CONNECTION_TIMED_OUT
          // console.log(response, status, headers, config);
          console.log("ERROR RESPONSE", response);
          $rootScope.$broadcast("hide:loading");
          def.reject(response);
        });
      return def.promise;
    }

    this.doGet = function(urlProvider, paramData, otherOptions, skipJsonConversion) {

      console.log('[DO-GET]', urlProvider, paramData, otherOptions, skipJsonConversion )
      var def = $q.defer();
      var url = ApiPaths.getPath(urlProvider);
      url = $interpolate(url)(paramData);

      $rootScope.$broadcast("show:loading");

      var options = {
        method: "GET",
        url: url,
        transformResponse: this.appendTransform($http.defaults.transformResponse, function(response, headers) {
          // var contentType = (headers()['content-type']);
          // console.log("contentType: " + contentType);
          // console.log("contentType: " + contentType.indexOf('html'));
          // console.log(skipJsonConversion);
          if (!skipJsonConversion) {
            try {
              return ngXml2json.parser(response);
            } catch (ex) {
              return response;
            }
          }
          else {
            return response;
          }
        }),
        withCredentials:true,
        data: paramData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      };

      for (var key in otherOptions) {
        options[key] = otherOptions[key];
      }
      console.log("otherOptions", otherOptions);

      $http(options).then(function(response) {
          console.log(response);
          $rootScope.$broadcast("hide:loading");
          def.resolve(response);
        },
        function(response) {
          $rootScope.$broadcast("hide:loading");
          def.reject(response);
        });
      return def.promise;
    }

  }]);
