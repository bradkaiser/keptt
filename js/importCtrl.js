angular.module('grouper').controller('ImportCtrl', ['$scope', '_', 'dataService', function($scope, _, dataService) {

    $scope.files = [];
    $scope.hasHeader = true;

    var convertDatumArrayToObject = function(datum) {
        return _.zipObject($scope.model.columns, datum);
    };

    $scope.import = function() {
        _.forEach($scope.files, function(file) {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                $scope.$apply(function() {
                    var fileContents = _(fileReader.result.split("\n"))
                                    .map(function(line) { return line.split(",") })
                                    .value();

                    if ($scope.hasHeader) {
                        $scope.model.columns = fileContents.shift();
			fileContents.splice(fileContents.length - 1, 1);
                    } else {
                        $scope.model.columns = _.map(_.range(fileContents.length), function(i) { return "Col" + (i + 1); });
                    }

                    console.log(fileContents);
                    $scope.model.data = _.map(fileContents, convertDatumArrayToObject);
                    console.log($scope.model.data);
                });
            };

            fileReader.readAsText(file);
        });

        //$scope.files = [];

        //max next tab possible.
        $scope.availableTabs[1] = 1;
    };

}]);
