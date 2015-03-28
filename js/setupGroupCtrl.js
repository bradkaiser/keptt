angular.module('grouper')
    .controller('SetupGroupCtrl', ['$scope', 'dataService', function($scope, dataService) {

        $scope.groupingMethod = "";
        $scope.groupingAttribute = "";

        $scope.test = function() {
            console.log(dataService.getItems());
        };
}]);

