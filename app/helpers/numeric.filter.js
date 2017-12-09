angular
.module('helpers')
.filter('round', function() {
    return function(input) {
      input = (isNaN(input)) ? 0 : input;
      return Math.round(input);
    };
})
.filter('capAtNum', function() {
    return function(input, cap) {
      input = (isNaN(input)) ? 0 : input;
      return ( Math.min(cap, input));
    };
})
.filter('progressConverter', function() {
    return function(input, steps) {
      input = (isNaN(input)) ? 0 : input;
      var periodicity = 100/steps;
      return (Math.min(steps, Math.round(input/periodicity)));
    };
})
.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input, decimals) + '%';
  };
}])
.filter('_toDate', function () {
  return function (input) {
    try {
      var newDate = new Date(input);
      return newDate;
    }
    catch($ex) {
      return input;
    }
  };
})


// Used for development purposes only
.filter('toJSONString', function() {
    return function(input) {
      return JSON.stringify(input, null, "\t");
    };
})
