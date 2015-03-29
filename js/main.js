var app = angular.module('grouper', ['ui.bootstrap', 'data', 'ngDraggable']);

app.constant('_', window._);
app.run(function($rootScope) {
    $rootScope._ = window._;
});

app.controller('MainCtrl', ['$scope', function($scope) {
    $scope.selected = {'tab':  1};
    $scope.model = { data: [], columns: [] };
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

// Pop up for the page telling the user not to leave
//window.onbeforeunload = function() {
//    return "Refreshing or leaving this page will result in all current data being lost.";
//}

