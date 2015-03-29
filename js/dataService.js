var app = angular.module('data', []);

app.constant('_', window._);
app.run(function($rootScope) {
    $rootScope._ = window._;
});

app.factory('dataService', ['_', function(_) {
    var service = {};

    service.splitGroups = function(data, attribute, elementsPerGroup) {
        console.log("lodash is below");
        console.log(_);
        console.log(data);
        console.log(attribute);
        console.log(elementsPerGroup);
        return _(data)
                .sortByAll([attribute])
                .chunk(elementsPerGroup)
                .transform(function(result,group, index) {
                    var groupName = 'Group' + index;
                    result[groupName] = group;
                }, {})
                .value();
    };
    
    service.balanceGroups = function(data, attribute, numberOfGroups) {
	console.log(data);
	console.log(attribute);
	console.log(numberOfGroups);
    };
    return service;

}]);



