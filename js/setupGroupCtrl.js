angular.module('grouper')
    .controller('SetupGroupCtrl', ['$scope', 'dataService', function($scope, dataService) {

        $scope.groupingMethods = {"groupSize": "group-size", "numberGroup": "number-group" };
        $scope.attributeGroupingStrategies = {"split": "split", "balance": "balance" };


        $scope.groupingMethod = "";
        $scope.groupingAttribute = "";
        $scope.numberOfGroups = null;
        $scope.groupSize = null;
        $scope.attributeGroupingStrategy = "";

        $scope.test = function() {
            console.log($scope.model.data);
            console.log($scope.model.columns);
        };
}]);

