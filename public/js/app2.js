var app2 = angular.module('app2', []);

app2.controller('formController', function($scope, dataservice) {
	$scope.page = 3;
	$scope.hidden = true;
	$scope.options = ["Please Choose","Money Market Account","Credit Card Account","Auto Loan Account","Personal Loan Account",
	"Investment Account","Checking Account","Home Loan Account","Savings Account"];

	$scope.searchclick = function() {

	dataservice.searchone($scope.searchvalue).success(function(response){

    		$scope.peopledata = response;
    	
    });

	};

	$scope.next = function() {

		
		dataservice.nextpage($scope.page).success(function(response){

			$scope.peopledata = response;
			$scope.page = $scope.page + 1;
		})
		
	};

	$scope.prev = function() {

		
		dataservice.nextpage($scope.page).success(function(response){

			$scope.peopledata = response;
			$scope.page = $scope.page - 1;
		})
		
	};

    $scope.viewclick = function() {
    	$scope.hidden = false;

        dataservice.searchall().success(function(response) {

            $scope.peopledata = response;
            
        });
    };

    $scope.deleteclick = function(id) {
        

        var userId = $scope.peopledata[id].id;
        
        
        dataservice.delete(userId).success(function(response) {

            $scope.peopledata.splice(id, 1);

        });
    };

    $scope.submitclick = function(ojb) {
    	
        

        dataservice.add(ojb).success(function(response) {
        	console.log(response);
            $scope.peopledata = [response];
        });
    };

    $scope.showEditRow = function(r) {
    	if($scope.active!=r){
    		$scope.active = r;
    	}
    	else{
    		$scope.active = null;
    	}
    }

    $scope.update = function(oj,id) {

    	dataservice.update(oj,id).success(function(response){

    		console.log(response);
    		$scope.peopledata = [response];
    	})
    }

    $scope.master = {};
   
});





//dataservice factory..

app2.factory('dataservice',['$http',function($http){

	var obj = {};

	obj.searchone = function(text){

 		return $http.get('http://localhost:8080/people?name='+text); 
	}

	obj.searchall = function(){

		return $http.get('http://localhost:8080/people/?&_limit=20');
	}

	obj.delete = function(id){

		return $http.delete('http://localhost:8080/people/'+id);
	}

	obj.add = function(object){
		
		return $http.post('http://localhost:8080/people', object);
	}

	obj.update = function(myob,id){
		return $http.put('http://localhost:8080/people/'+id,myob);
	}

	obj.nextpage = function(start){
		return $http.get('http://localhost:8080/people/?_page='+start);
	}

	
	return obj;
}]);







	
