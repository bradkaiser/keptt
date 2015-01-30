var app = angular.module('grouper', []);

app.controller('MainCtrl', function($scope) {
    $scope.selectedTab = 1;

    $scope.students = ["doug","marcia","bill"];
});


app.controller('ImportCtrl', function($scope) {

    $scope.files = [];

    $scope.addFile = function() {
        console.log("boom");
    };

});

app.controller('TeamCtrl', function($scope) {
});

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

