var app = angular.module('data', []);

app.factory('dataService', function() {
    var service = {};

    var items = [];

    service.setItems = function(data) {
        items = data;
    };

    service.getItems = function() {
        return items;
    };
});



