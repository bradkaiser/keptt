var app = angular.module('data', []);

app.constant('_', window._);
app.run(function($rootScope) {
    $rootScope._ = window._;
});

app.factory('dataService', ['_', function(_) {
    var service = {};

    service.splitGroups = function(data, attribute, elementsPerGroup) {
        return _(data)
                .sortByAll([attribute])
                .chunk(elementsPerGroup)
				.map(function (value, index) {
                    var groupName = 'Group ' + index;
					return {"name": groupName, "items": value};
                })
                .value();
    };
    
    service.balanceGroups = function(data, attribute, numberOfGroups) {
	console.log(data);
	console.log(attribute);
	console.log(numberOfGroups);

	var sortedData = _.sortBy(data, attribute);
	
	var begin = 0; 
	var end = sortedData.length - 1;
	
	while(begin <= end) {
		var count = 1;
		for(i = 0; i < numberOfGroups && begin <= end; i++) {
			var gr = "Group ";
			sortedData[begin]["Group"] = count;
			begin++;
			count++; 
		}
		var count = 1;
		for(j = numberOfGroups; j > 0 && begin <= end; j--) {
			var gr = "Group ";
			sortedData[end]["Group"] = count;
			end--;
			count++;
		}
	}
	
	var groups = [];
        var gr = "Group ";
        for(i = 1; i <= numberOfGroups; i++) {
		var group = {};
        	var members = [];
                for(j = 0; j < sortedData.length; j++) {

                	if(sortedData[j]["Group"] == i) {
                                delete sortedData[j]["Group"];
                                members.push(sortedData[j]);
                        }
                }
		group["name"] = gr.concat(i.toString());
		group["items"] = members;
		groups.push(group);
        }

	console.log(groups);	
	return groups;
    };
    return service;

}]);



