var app = angular.module('grouper', []);

app.controller('MainCtrl', function($scope) {
    $scope.selectedTab == 1;

    $scope.students = ["doug","marcia","bill"];
});


app.controller('ImportCtrl', function($scope) {
});

app.controller('TeamCtrl', function($scope) {
});
