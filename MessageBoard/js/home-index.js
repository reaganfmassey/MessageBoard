var app = angular.module("myapp",[]);


app.controller("homeIndexController", function ($scope,$http) {
    //alert("In the homeIndexController");

    $scope.dataCount = 0;
    $scope.data = [];
    $scope.isBusy = true;
    $http.get("/api/topics/?includeReplies=true")
        .then(function (result) {
            // api successfuly called
            angular.copy(result.data, $scope.data);
            $scope.dataCount = result.data.length;
        },
        function () {
            //error
            alert("could not load topics");
        })
        .then(function () {
            $scope.isBusy = false;
        });
});