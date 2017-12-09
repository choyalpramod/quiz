angular
    .module('angular-multiple-item-carousel', [])
    .controller('angularMultipleItemCarouselController', ['$scope', '$rootScope', '$window',
        function($scope, $rootScope, $window) {

          $scope.carouselIndex = 3;
          $scope.carouselIndex2 = 0;
          $scope.carouselIndex2 = 1;
          $scope.carouselIndex3 = 5;
          $scope.carouselIndex4 = 5;
          $scope.carouselSliderArchitecture = function(){
              var perDisplayedSlideItem = 1;
              if($window.innerWidth >= 960){
                  perDisplayedSlideItem = 4;
              }
              else if($window.innerWidth < 480) {
                  perDisplayedSlideItem = 1;
              }
              else if($window.innerWidth < 768){
                  perDisplayedSlideItem = 2;
              }
              else if($window.innerWidth < 960){
                  perDisplayedSlideItem = 3;
              }
              return perDisplayedSlideItem;
          };

          $rootScope.createMultipleItemCarousel = function(data){

            var createArray = [];
            var perSlideCount = $scope.carouselSliderArchitecture();
            var parentDisplayedSlideCount = Math.ceil(data.length/perSlideCount);

            for(var i=0; i<parentDisplayedSlideCount; i++){
              var tempRelatedData = [];
              for(var j = 0, k = ((i*perSlideCount) + j); j < perSlideCount; j++, k=((i*perSlideCount) + j) ){
                if(data[k]){
                  tempRelatedData[j] = data[k];
                }
                else{
                  var tempObj = {
                    "entity_id":j,
                    "is_null": 1
                  };
                  tempRelatedData[j] = tempObj;
                }
              }
              createArray[i] = tempRelatedData;
            }
            return createArray;
          };
        }
    ])
