angular.module('grouper').controller('ImportCtrl', ['$scope', 'lodash', 'dataService', function($scope, _, dataService) {

    $scope.files = [];
    $scope.rawData = [];
    $scope.hasHeader = true;
    $scope.columns = [];

    $scope.import = function() {
        _.forEach($scope.files, function(file) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                $scope.$apply(function() {
                    var fileContents = _(fileReader.result.split("\n"))
                                    .map(function(line) { return line.split(",") })
                                    .value();

                    if ($scope.hasHeader) {
                        $scope.columns = fileContents.shift();
                        $scope.rawData = fileContents;
                    } else {
                        $scope.columns = _.map(_.range(fileContents.length), function(i) { return "Col" + (i + 1); });
                        $scope.rawData = fileContents;
                    }
                });
            };

            fileReader.readAsText(file);
        });

        $scope.files = [];
    };

    var convertDatumArrayToObject = function(datum) {
        return _.zipObject($scope.columns, datum);
    };

    $scope.next = function() {
        dataService.setItems(_.map($scope.rawData, convertDatumArrayToObject));
        $scope.selected.tab++;
    };


}]);
