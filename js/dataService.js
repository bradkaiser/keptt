var app = angular.module('data', []);

app.factory('dataService', function() {
    var service = {};

    var items = [];
    var columns = [];

    service.setItems = function(data) {
        items = data;
    };

    service.getItems = function() {
        return items;
    };

    service.setColumns = function(data) {
        columns = data;
    };

    service.getColumns = function() {
        return columns;
    };

    return service;

});



