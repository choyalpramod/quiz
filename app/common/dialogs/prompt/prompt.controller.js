angular.module('zhDialogs',[])
.controller('zhDialogsController', ['$scope', '$mdDialog', 'zhDialogsService', function($scope, $mdDialog, zhDialogsService){

  $scope.abortDialog = function(){
    $mdDialog.cancel();
  }
}])
// .directive('parseValidations', function(tElm, attrs) {
//   console.log(attrs);
//   var tmpElement = tElm;
//
//   if(attrs.indexOf("required")) {
//     tmpElement.addAttribute("required");
//   }
//
//   tElm.replaceWith(tmpElement);
// }
