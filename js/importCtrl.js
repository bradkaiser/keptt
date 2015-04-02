angular.module('grouper').controller('ImportCtrl', ['$scope', '_', 'dataService', function($scope, _, dataService) {

    $scope.files = [];
    $scope.hasHeader = true;
    $scope.includesData = [];
    $scope.primaryKeyData = [];

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
                        $scope.model.columns = _.map(_.range(fileContents[0].length), function(i) { return "Column " + (i + 1); });
			fileContents.splice(fileContents.length - 1, 1);
                    }

                    $scope.model.data = _.map(fileContents, convertDatumArrayToObject);

                    for(var i = 0; i < $scope.model.columns.length; i++) {
                        $scope.includesData[i] = { id: i, label: $scope.model.columns[i]};
                        $scope.primaryKeyData[i] = { id: $scope.model.columns[i], label: $scope.model.columns[i]};

                        $scope.model.includes[i] = { id: i, label: $scope.model.columns[i]};            //select
                        if(i==0) {
                            $scope.model.keys[0] = { id: $scope.model.columns[0], label: $scope.model.columns[0]};  //select first
                            console.log($scope.model.columns[0]);
                        }
                    }                
                });
            };

            fileReader.readAsText(file);
        });
        //max next tab possible.
        $scope.availableTabs[1] = 1;
    };
}]);
