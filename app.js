angular.module('infiniteScroll', [])
.directive('infiniteScroll', [ "$window", function ($window) {
return 
    {  
      link:function (scope, element, attrs) {
      var offset = parseInt(attrs.threshold) || 0;
      var e = element[0];
      element.bind('scroll', function () {
      if (scope.$eval(attrs.canLoad) && e.scrollTop + e.offsetHeight >= e.scrollHeight - offset) {
          scope.$apply(attrs.infiniteScroll);
      }
      });
    }
  };
}]);

var whirl = angular.module("snowwhirl", ['infiniteScroll'])

whirl.filter('fromTo', function() {
        return function(input, from, total, lessThan) {
            from = parseInt(from);
            total = parseInt(total);
            for (var i = from; i < from + total && i < lessThan; i++) {
                input.push(i);
            }
            return input;
        }
    });

whirl.factory('instagram', ['$http',
        function($http) {
            return {
                fetch: function(callback) {

                    var endPoint = "https://api.instagram.com/v1/media/popular?client_id=d655842c40d94cb48f64355ca7ebee08&callback=JSON_CALLBACK";
                    $http.jsonp(endPoint).success(function(response) {

                        callback(response.data);
                    });
                }
            }
        }
    ]);

whirl.directive("whenScrolled", function(){
    return{
        link: function(scope, elem, attrs){
          restrict: "A"
          // we get a list of elements of size 1 and need the first element
          raw = elem[0];
        
          // we load more elements when scrolled past a limit
          elem.bind("scroll", function(){
            if(raw.scrollTop+raw.offsetHeight+1 >= raw.scrollHeight){
              scope.loading = "true";
            // we can give any function which loads more elements into the list
              scope.$apply(attrs.whenScrolled);
            }
          });
        }
      }
    });

whirl.directive('infiniteScroll', [ "$window", function ($window) {
return {
      link:function (scope, element, attrs) {
      var offset = parseInt(attrs.threshold) || 0;
      var e = element[0];
      element.bind('scroll', function () {
      if (scope.$eval(attrs.canLoad) && e.scrollTop + e.offsetHeight >= e.scrollHeight - offset) {
          scope.$apply(attrs.infiniteScroll);
        }
      });
    }
    };
  }]);
whirl.controller("insta", function($scope, $interval, instagram) {
      $scope.pics = [];
      $scope.have = [];
      $scope.loading = true;
      $scope.orderBy = "-likes.count";
      $scope.more = function() {
        instagram.fetch(function(data) {
            for(var i=0; i<data.length; i++) {
              if (typeof $scope.have[data[i].id]==="undefined") {
                $scope.pics.push(data[i]) ;
                $scope.have[data[i].id] = "1";
              }
            $scope.loading = false;
            }
        });
      };
      $scope.more();
    });
/*app = angular.module("demo", []);

app.controller("MainController", function($scope, $http){
  
  // the array which represents the list
  $scope.items = ["1. Scroll the list to load more"];
  $scope.loading = true;
  
  // this function fetches a random text and adds it to array
  $scope.more = function(){
    $http({
      method: "GET",
      url: "https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1"
    }).success(function(data, status, header, config){
      
      // returned data contains an array of 2 sentences
      for(line in data){
        newItem = ($scope.items.length+1)+". "+data[line];
        $scope.items.push(newItem);
      }
      $scope.loading = false;
    });
  };
  
  // we call the function twice to populate the list
  $scope.more();
});*/