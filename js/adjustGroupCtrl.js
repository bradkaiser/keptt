angular.module('grouper')
    .controller('AdjustGroupCtrl', ['$scope', 'dataService', function($scope, dataService) {

        $scope.layout = 0; //0 == list, 1 == visual
        $scope.selectedGroup = 0;

        $scope.test = function(id) {
            $scope.selectedGroup = id;
        }
        $scope.onDropComplete=function(data,event, gIndex){
            var res = data.split(':');
            var item = $scope.model.groups[res[0]].items.splice(res[1], 1)[0];
            $scope.model.groups[gIndex].items.push(item);
        }
}]);