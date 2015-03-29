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
        $scope.onDropComplete=function(data,event, gIndex){
            var res = data.split(':');
            var item = this.groups[res[0]].splice(res[1], 1)[0];
            this.groups[gIndex].push(item);
        }
}]);