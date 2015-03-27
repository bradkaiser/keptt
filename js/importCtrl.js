angular.module('grouper').controller('ImportCtrl', ['$scope', 'lodash', function($scope, _) {

    $scope.files = [];

    $scope.import = function() {
        _.forEach($scope.files, function(file) {
            var fileReader = new FileReader();

            fileReader.onload = function(e) {
                $scope.$apply(function() {
                    var names = _(fileReader.result.split("\n"))
                                    .map(function(line) { return line.split(",") })
                                    .pluck(1)
                                    .value();

                    $scope.model.students = names;
                    $scope.files = [];
                });
            };

            fileReader.readAsText(file);
        });
    };
}]);
