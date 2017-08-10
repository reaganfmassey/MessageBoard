var app = angular.module("myapp",['ngRoute']);


app.config(['$routeProvider','$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/templates/topicsView.html',
                controller: 'topicsController'
            }).
            when('/newmessage', {
                controller: 'newTopicController',
                templateUrl: '/templates/newTopicView.html'
            }).
            otherwise({
                redirectTo: '/'
            });
        //$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('');
    }
]);


/*app.factory("dataService", function ($http,$q) {
    var _topics = [];

    var _getTopics = function () {

        var deferred = $q.defer();
        $http.get("/api/topics/?includeReplies=true")
        .then(function (result) {
            // api successfuly called
            angular.copy(result.data, $scope.data);
            deferred.resolve();
        },
        function () {
            //error
            deferred.reject();
        });
        return deferred.promise;
    };

    return {
        topics: _topics,
        getTopics:_getTopics
    };
});

*/
app.factory("topicservice", ['$http', function ($http) {
    
    var topicservice = {};
    
    topicservice.getTopics = function () {
        alert("in service");
        return $http.get("/api/topics/?includeReplies=true");
                
    };
        return topicservice;

}]);


app.controller("topicsController", function ($scope, $http,topicservice) {
    //alert("In the homeIndexController");

    $scope.dataCount = 0;
    $scope.data = [];
    $scope.isBusy = true;
    topicservice.getTopics()
        .then(function (response) {
            // topicservice api successfuly 
                //api data stored in response.data
                //console.log(JSON.stringify(response.data))            
                //console.log(JSON.stringify($scope.data))
            $scope.data = response.data
            
            console.log(JSON.stringify($scope.data))
            //console.log(JSON.stringify(data.topics))
            //angular.copy(result.data, $scope.data);      
           
        },
        function () {
            //error
            alert("could not load topics");
        })
        .then(function () {
            $scope.isBusy = false;
        });
});

app.controller("newTopicController", function ($scope, $http, $window) {
    //alert("In the newTopicController");

    $scope.newTopic = {};

    $scope.save = function () {
        $http.post("/api/topics", $scope.newTopic)
            .then(function (result) {
                //success
                var newTopic = result.data;
                //todo merge with existing list of topics
                $window.location = "#/";
            }, function () {
                //api failure
                alert("cannot save the new Topic");
            });
    };
});