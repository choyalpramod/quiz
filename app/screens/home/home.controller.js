angular
    .module('home', [])
    .controller('homeController', ['$scope', "$timeout", "commonHelpers", function($scope, $timeout, commonHelpers) {
        var thisObj = this;

        thisObj.userLoggedIn = false;
        thisObj.lastQuestion = false;

        var promoptObj = {
            title: "",
            content: "",
            some: ""
        };

        thisObj.questions = [{
                number: 1,
                question: "Html is used in Websites?",
                options: [{
                        option: "False"
                    },
                    {
                        option: "True"
                    }
                ],
                rightAnswer: 1,
            },
            {
                number: 2,
                question: "JavaScript is used in Websites?",
                options: [{
                        option: "False"
                    },
                    {
                        option: "True"
                    }
                ],
                rightAnswer: 1,
            },
            {
                number: 3,
                question: "Angular is used in Websites?",
                options: [{
                        option: "No"
                    },
                    {
                        option: "Yes"
                    }
                ],
                rightAnswer: 1,
            },
            {
                number: 4,
                question: "ReactJs  is used in Websites?",
                options: [{
                        option: "No",
                    },
                    {
                        option: "Yes"
                    }
                ],
                rightAnswer: 1,
            },
            {
                number: 5,
                question: "Where reactjs can be used?",
                options: [
                    {
                        option: "Websites",
                    },
                    {
                        option: "Hybrid Mobile App",
                    },
                    {
                        option: "Option 1 & 2",
                    },
                    {
                        option: "None of the above",
                    },
                ],
                rightAnswer: 2,
            }

        ]
        thisObj.currentQuestion = thisObj.questions[0].number;

        thisObj.saveLogin = function() {
            thisObj.userLoggedIn = true;
        }

        thisObj.saveUserAnswer = function(item, event) {
            // thisObj.rippleEffect();
            if (!thisObj.lastQuestion) {
                thisObj.currentQuestion += 1;
                if (thisObj.questions.length == thisObj.currentQuestion) {
                    thisObj.lastQuestion = true;
                }
            } else {
                thisObj.finishQuiz();
            }
        }

        thisObj.finishQuiz = function() {
            thisObj.finished = true;

            var countRightAnswer = 0;
            angular.forEach(thisObj.questions, function(value,index){
                if(value.rightAnswer == value.selectedAnswer){
                    countRightAnswer++;
                }
            });
            thisObj.labels = ['Right Answer','Wrong Answer'];
            thisObj.chartData = [countRightAnswer,(thisObj.questions.length - countRightAnswer)];
        }

      //   thisObj.rippleEffect = function(){
      //   var $div = ,
      //       btnOffset = $(this).offset(),
      //   		xPos = event.pageX - btnOffset.left,
      //   		yPos = event.pageY - btnOffset.top;
      //   $div.addClass('ripple-effect');
      //   var $ripple = $(".ripple-effect");
      //
      //   $ripple.css("height", $(this).height());
      //   $ripple.css("width", $(this).height());
      //   $div
      //     .css({
      //       top: yPos - ($ripple.height()/2),
      //       left: xPos - ($ripple.width()/2),
      //       background: $(this).data("ripple-color")
      //     })
      //     .appendTo($(this));
      //
      //   window.setTimeout(function(){
      //     $div.remove();
      //   }, 2000);
      // }



        $scope.thisObj = thisObj;
    }])
    .directive("login", function() {
        return {
            restrict: 'E',
            templateUrl: 'screens/home/snippets/login.html'
        }
    })
    .directive("quiz", function() {
        return {
            restrict: 'E',
            templateUrl: 'screens/home/snippets/quiz.html'
        }
    })
    .directive("quizFinished", function() {
        return {
            restrict: 'E',
            templateUrl: 'screens/home/snippets/finishQuiz.html'
        }
    })
