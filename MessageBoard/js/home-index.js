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
            when('/message/:id', {
                controller: 'singleTopicController',
                templateUrl:'/templates/singleTopicView.html'
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
app.factory("topicservice", ['$http','$window', function ($http,$window) {
    
    var topicservice = {};
    var _isInit = false;
    topicservice.allTopics = [];
    topicservice.getTopics = function () {
        //alert("in service");
        
         return $http.get("/api/topics/?includeReplies=true").then(
            function (response) {
                //alert("in get method");
                topicservice.allTopics = response.data;                
                _isInit = true;
                //alert(JSON.stringify(topicservice.allTopics));
                //alert("getting out man");
                return  response;
            });
                
    };
    topicservice.somemethod = function (newTopic) {
        console.log(newTopic);
        return $http.post("/api/topics", newTopic).then(
            function (response) {                
                var newlyCreatedTopic = response.data;
                topicservice.allTopics.splice(0, 0, newlyCreatedTopic);
                $window.location = "#/";
            }, function () {
                alert("failed in service");
            });
    };
    topicservice.isReady = function () {
        return _isInit;
    };
    topicservice.currentTopic = {};
    topicservice.getTopicById = function (topicid) {
        var givtopics = topicservice.allTopics;
        var result = $.grep(givtopics, function (e) { return e.id == topicid });
        
        if (result.length) {
            topicservice.currentTopic=result;
            return result[0];
        }
        else {
            alert("not found ra");
        }

    };
    topicservice.saveReply = function (topic, newReply) {
        
        //alert("This object is youre going to send");        
        var someobj = JSON.stringify(newReply);
        //console.log(newReply);
        //console.log(someobj);
        return $http({
            method:'POST',
            url: "/api/topics/" + topic.id + "/replies",
            headers: { 'Content-Type': 'application/json' },
            data:someobj
        })
            .then(function (result) {
                if (topic.replies==null) {
                    topic.replies = [];
                }
                //alert(JSON.stringify(result.data));
                var x = topic.replies.push(result.data);
                
            }, function () {
                alert("api calling failed");
            });
        
    
    };
        return topicservice;

}]);


app.controller("topicsController", function ($scope, $http, topicservice) {
    //alert("In the homeIndexController");

    $scope.dataCount = 0;
    $scope.data = topicservice.allTopics;
    $scope.isBusy = false;    
    if (topicservice.isReady() == false) {
        $scope.isBusy=true
        topicservice.getTopics()
        .then(function (response) {
            $scope.data = response.data
            //alert(JSON.stringify(topicservice.allTopics));
        },
        function () {
            //error
            alert("could not load topics");
        })
        .then(function () {
            $scope.isBusy = false;
        });
    }
    //alert(JSON.stringify(topicservice.allTopics));
    //$scope.data = topicservice.allTopics;

    
});

app.controller("newTopicController", function ($scope, $http, $window, topicservice) {
    //alert("In the newTopicController");
    var s="this will passed"
    
    $scope.newTopic = {};

    $scope.save = function () {
        topicservice.somemethod($scope.newTopic)
            .then(function (response) {
                //success
                var newsTopic = response.data;
                //$window.location = "#/";
            });
    };
    
});

app.controller("singleTopicController", function ($scope, $window, $routeParams, topicservice) {
    $scope.topic = [];
    $scope.newReply = {};
    
    $scope.topic = topicservice.getTopicById($routeParams.id);
    
    $scope.addReply = function () {
        //function for adding reply
        //alert(JSON.stringify($scope.newReply));
        topicservice.saveReply($scope.topic, $scope.newReply)
            .then(function () {
               //alert("in controller");
            }, function () {
                //failure -api might not returned properly
                alert("Could not save the reply");
            });
        //alert("after pushing");
        $scope.newReply.body = "";
    };
});