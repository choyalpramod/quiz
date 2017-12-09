angular
.module('layout')
.directive('zhHeader', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'common/layout/snippets/header.html'
  }
})
.directive('zhFooter', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'common/layout/snippets/footer.html'
  }
})
// .directive('zhContent', function() {
//   return {
//     restrict: 'E',
//     replace: true,
//     templateUrl: 'common/layout/snippets/content.html'
//   }
// })
