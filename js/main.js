var app = angular.module('grouper', ['ngLodash']);

app.controller('MainCtrl', function($scope) {
    $scope.selectedTab = 1;

    $scope.model = { students: [],
                     teams: [ {name: "red", color: "#E74C3C"},
                             {name: "orange", color: "#E67E22"},
                             {name: "yellow", color: "#F1C40F"},
                             {name: "green", color: "#27AE60"},
                             {name: "aqua", color: "#1ABC9C"},
                             {name: "blue", color: "#3498DB"},
                             {name: "purple", color: "#9B59B6"},
                             {name: "indigo", color: "#191970"},
                             {name: "grey", color: "#95A5A6"},
                             {name: "pink", color: "#DB0A5B"}],
                    selectedTeam: 0


    };

    $scope.$watch( 
            function() { return $scope.model.students; },
            function(newValue, oldValue) {
                console.log("students changed from " + oldValue.length + " to " + newValue.length);
            });

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

