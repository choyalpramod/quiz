angular
    .module('helpers')
    .service('commonHelpers', ['$rootScope', '$mdDialog', '$timeout', function($rootScope, $mdDialog, $timeout) {

        this.showPrompt = function(objSettings) {
            var confirm = {
                bindToController: true,
                controller: 'zhDialogsController',
                templateUrl: 'common/dialogs/prompt/prompt.template.html',
                parent: angular.element(document.body),
                controllerAs: 'ctrl',
                clickOutsideToClose: true,
                locals: {
                    title: objSettings.title,
                    someContent: objSettings.some,
                    textContent: objSettings.content,
                    ok: "Ok"
                }
            }
            return $mdDialog.show(confirm);
        };


        this.getError = function(response) {
            var returnObj = {
                text: "",
                status: null
            };

            try {
                if (response.message) {
                    response.data = {
                        message: response.message
                    }
                }
                returnObj.text = response.data.message.text;
                returnObj.status = response.data.message.status;

            } catch (ex) {
                returnObj.text = "";
                returnObj.status = CONSTANTS.ZH_RESPONSE_MESSAGE_STATUS_SUCCESS;
            }
            return returnObj;
        }



        this.setSessionStorage = function(id, jsonObj){
            window.sessionStorage.setItem(id, JSON.stringify(jsonObj));
        }
        this.getSessionStorage = function(id){
            return JSON.parse(window.sessionStorage.getItem(id));
        }

        this.setLocalStorage = function(id, jsonObj){
            window.localStorage.setItem(id, JSON.stringify(jsonObj));
        }
        this.getLocalStorage = function(id) {
            return JSON.parse(window.localStorage.getItem(id));
        }


        // Global Notifications and Errors
        this.addGlobalMessage = function(_status, _text, _timeout) {
          var newObj = {
            status: _status,
            text: _text,
            timeout: _timeout
          }

          $rootScope.globalNotifications.push(newObj);

          if(_timeout) {
            var length = $rootScope.globalNotifications.length - 1;
            $timeout(function() {
              delete $rootScope.globalNotifications[length];
            }, _timeout);
          }
        }
        this.addGlobalError = function(text) {
          this.addGlobalMessage(CONSTANTS.ZH_RESPONSE_MESSAGE_STATUS_ERROR, text, CONSTANTS.ZH_TOAST_DURATION_NONE);
        }

        this.addGlobalSuccess = function(text) {
          this.addGlobalMessage(CONSTANTS.ZH_RESPONSE_MESSAGE_STATUS_SUCCESS, text, CONSTANTS.ZH_TOAST_DURATION_LONG);
        }

        this.addGlobalNotification = function(text){
          this.addGlobalMessage(CONSTANTS.ZH_RESPONSE_MESSAGE_STATUS_NOTIFICATION, text, CONSTANTS.ZH_TOAST_DURATION_LONG);
        }

        this.mergeCustomOptionsData = function(obj) {
          // console.log('\n\n\n\n\n\n\n',obj);
            var mergedArray = [];
            var index = 0;
            angular.forEach(obj, function(value, key){
              console.log(value);
                var splitLabel = value.label.split(',');
                if(splitLabel.length > 1){
                    var splitText = value.text.split(',');
                    for(var i=0; i< splitText.length; i++){
                        mergedArray[i] = [];
                        mergedArray[i]['label'] = splitLabel[i];
                        mergedArray[i]['text'] = splitText[i];
                    }
                }
                else{
                    mergedArray[index] = value;
                }
                index++;
            });

            console.log(mergedArray);
            return mergedArray;
        }

        // this.alert = function(_title, _message) {
        //   var alertPopup = $ionicPopup.alert({
        //     title: _title,
        //     template: _message
        //   });
        //   return alertPopup;
        // }
        //
        // this.confirm = function(_title, _message) {
        //   var confirmPopup = $ionicPopup.confirm({
        //     title: _title,
        //     template: _message
        //   });
        //   return confirmPopup;
        // }
        //
        // this.showNativeToast = function(message, duration) {
        //   if (duration == CONSTANTS.ZH_TOAST_DURATION_LONG) {
        //     window.plugins.toast.showLongBottom(message,
        //       // When Toast displayed
        //       function(a) {},
        //       // When toast hide
        //       function(b) {}
        //     );
        //   } else if (duration == CONSTANTS.ZH_TOAST_DURATION_SHORT) {
        //     window.plugins.toast.showShortBottom(message,
        //       // When Toast displayed
        //       function(a) {},
        //       // When toast hide
        //       function(b) {}
        //     );
        //   }
        // }

    }])
    .filter("__translate", function() {
        return function(input) {
            return window.__translate(input);
        };
    })





// FUNCTIONS FOR GENERIC USE IN WINDOWS OBJECT
window.executeFunctionByName = function(functionName, context /*, args */ ) {
    var args = [].slice.call(arguments).splice(2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}
