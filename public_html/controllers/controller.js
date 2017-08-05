var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("controller");


var refresh = function() {
  $http.get('/students').success(function(response) {
    console.log("I got the data I requested");
    $scope.students = response;
    $scope.stud = "";
  });
};

refresh();

$scope.add = function() {
  console.log('data in add----------->>',$scope.stud);
  $http.post('/students', $scope.stud).success(function(response) {
    console.log('add------------>>>',response);
    refresh();
  });
};

$scope.remove = function(id){
  console.log('id---------->',id);
  $http.delete('/students/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/students/' + id).success(function(response) {
    $scope.stud = response;
  });
};  

$scope.update = function() {
  console.log($scope.stud.id);
  $http.put('/students/' + $scope.stud.id, $scope.stud).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.stud = "";
}

}]);