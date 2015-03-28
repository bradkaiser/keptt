var app = angular.module('grouper', ['ngLodash', 'data']);

app.controller('MainCtrl', ['$scope', function($scope) {
    $scope.selected = {'tab':  1};
}]);

app.directive("fileread", function() {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    for (var i = 0; i < changeEvent.target.files.length; i++) {
                        scope.fileread.push(changeEvent.target.files.item(i));
                    }
                });
            });
        }
    };
});

