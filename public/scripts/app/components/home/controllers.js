var homeControllers = angular.module('homeControllers', []);

homeControllers.controller('HomeCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.title = 'Home';
  }]);
