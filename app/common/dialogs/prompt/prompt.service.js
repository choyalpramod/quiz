angular.module('zhDialogs')
.service('zhDialogsService', ['ajaxService', function(ajaxService) {
  this.submitNotifyMe = function(data) {
    return ajaxService.doPost(data.postURL, data);
  }
}]);
