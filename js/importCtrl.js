angular.module('grouper').controller('ImportCtrl', ['$scope', 'lodash', function($scope, _) {

    $scope.files = [];
    $scope.rawData = [];
    $scope.hasHeader = true;
    $scope.columns = [];

    $scope.import = function() {
        _.forEach($scope.files, function(file) {
            var fileReader = new FileReader();

            fileReader.onload = function(e) {
                $scope.$apply(function() {
                    $scope.rawData = _(fileReader.result.split("\n"))
                                    .map(function(line) { return line.split(",") })
                                    .value();

                    $scope.files = [];
                });
            };

            fileReader.readAsText(file);
        });
    };
}]);
