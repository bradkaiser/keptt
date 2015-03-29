angular.module('grouper')
    .controller('SetupGroupCtrl', ['$scope', 'dataService', function($scope, dataService) {

        $scope.groupingMethods = {"groupSize": "group-size", "numberGroup": "number-group" };
        $scope.attributeGroupingStrategies = {"split": "split", "balance": "balance" };

        $scope.grouping = {};

        $scope.test = function() {
            console.log($scope.model.data);
            console.log($scope.model.columns);
        };

        $scope.next = function() {
            var ags = $scope.attributeGroupingStrategies;
            var gm = $scope.groupingMethods;
	
            if ($scope.grouping.strategy = ags.split) {
                var elementsPerGroup;

                if ($scope.grouping.method === gm.groupSize) {
                    elementsPerGroup = $scope.grouping.groupSize;
                } else {
                    elementsPerGroup = Math.floor($scope.model.data.length / $scope.grouping.numberOfGroups);
                }

                $scope.model.groups = dataService.splitGroups($scope.model.data, $scope.grouping.attribute, elementsPerGroup);
            } else if ($scope.grouping.strategy = ags.balance) {

		if ($scope.grouping.method === gm.groupNumber) {		
		    $scope.model.groups = dataService.balanceGroups($scope.model.data, $scope.grouping.attribute, $scope.grouping.numberOfGroups);		
		} else {
			//No Heuristic thought of, right now
		}
            }
            $scope.$parent.next();
        };
}]);

