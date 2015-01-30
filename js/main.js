var app = angular.module('grouper', []);

app.controller('MainCtrl', function($scope) {
    $scope.selectedTab = 1;

    $scope.students = ["doug","marcia","bill"];
});


app.controller('ImportCtrl', function($scope) {

    $scope.files = [];

    $scope.import = function() {
        for (var i = 0; i< $scope.files.length; i++) {
            var file = $scope.files[i];
            var fileReader = new FileReader();

            fileReader.onload = function(e) {
                console.log(fileReader.result);
            }

            fileReader.readAsText(file);
        }
    }

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

