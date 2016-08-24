var app2 = angular.module('app2', []);

app2.controller('formController', function($scope, $http) {

    $scope.searchclick = function() {

        alert($scope.searchvalue);

        $http.get('http://localhost:8080/people?name=' + $scope.searchvalue).success(function(response) {

            $scope.peopledata = response;
        });
    };

    $scope.viewclick = function() {

        $http.get('http://localhost:8080/people/?&_limit=20').success(function(response) {

            $scope.peopledata = response;

        });
    };

    $scope.deleteclick = function(id) {
        console.log("Inside delete");

        console.log(id);
        var userId = $scope.peopledata[id].id;
        console.log(userId);
        $http.delete('http://localhost:8080/people/' + userId).success(function(response) {

            $scope.peopledata.splice(id, 1);

        });
    };

    $scope.submitclick = function(name, email, phonenumber, accounttype) {
	alert(name);
        var ojb = {
            name: name,
            email: email,
            phonenumber: phonenumber,
            accountname: accounttype
        };

        $http.post('http://localhost:8080/people', ojb).success(function(response) {

            $scope.peopledata = [response];
        });
    };


});
