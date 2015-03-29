angular.module('grouper')
    .controller('AdjustGroupCtrl', ['$scope', 'dataService', function($scope, dataService) {

        $scope.layout = 0; //0 == list, 1 == visual
        $scope.selectedGroup = 0;
        $scope.groups = [["one", "two", "three", "four"],["five", "six", "seven", "eight"]];

        $scope.test = function(id) {
            $scope.selectedGroup = id;
            console.log("selected group: " + $scope.selectedGroup);
            console.log("group contents: " + $scope.groups[$scope.selectedGroup]);
        }
}]);