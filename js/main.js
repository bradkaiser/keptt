var app = angular.module('grouper', ['ui.bootstrap', 'data', 'ngDraggable', 'ngAnimate']);

app.constant('_', window._);
app.run(function($rootScope) {
    $rootScope._ = window._;
});

app.controller('MainCtrl', ['$scope', '$timeout', '_', function($scope, $timeout, _) {
    $scope.selected = {'tab':  0};
    $scope.model = { data: [], columns: [] };
    $scope.availableTabs = [1,0,0,0];
    $scope.direction = 'forward';

    $scope.back = function() {
        $scope.direction = 'backward';
        $timeout(function() {
            $scope.selected.tab--;
        });
    };

    $scope.next = function() {
        $scope.direction = 'forward';
        if($scope.availableTabs[$scope.selected.tab + 1] == 1)
            $timeout(function() {
                $scope.selected.tab++;
            });
    };

    $scope.moveTo = function(targetTab) {
        var diff = targetTab - $scope.selected.tab;

        if (diff == 0) {
            return;
        } else if (diff > 0) {
            $scope.direction = 'forward';
        } else if (diff < 0) {
            $scope.direction = 'backward';
        }

        $timeout(function() {
            $scope.selected.tab = targetTab;
        });
    }
    
    $scope.export = function() {
	var groups = $scope.model.groups;
	var fileOutput = "";
	
	for(i = 0; i < groups.length; i++) {
	    
	    var items = groups[i].items;
	    for(j = 0; j < items.length; j++) {
		for(var key in items[j]) {
		    if (key != "$$hashKey") {
			fileOutput = fileOutput.concat(items[j][key]);
			fileOutput = fileOutput.concat(",");
		    }
		}
		fileOutput = fileOutput.concat(groups[i].name);
		fileOutput = fileOutput.concat("\n");
	    }	
	}
	console.log(fileOutput);	
    }
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
                    scope.$parent.import();
                });
            });
        }
    };
});

// Pop up for the page telling the user not to leave
//window.onbeforeunload = function() {
//    return "Refreshing or leaving this page will result in all current data being lost.";
//}

