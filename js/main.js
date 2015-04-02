var app = angular.module('grouper', ['ui.bootstrap', 'data', 'ngDraggable', 'ngAnimate', 'angularjs-dropdown-multiselect']);

app.constant('_', window._);
app.run(function($rootScope) {
    $rootScope._ = window._;
});

app.controller('MainCtrl', ['$scope', '$timeout', '_', function($scope, $timeout, _) {
    $scope.selected = {'tab':  0};
    $scope.model = { data: [], columns: [], includes: [], keys: [] };
    $scope.availableTabs = [1,0,0,0];
    $scope.direction = 'forward';
	$scope.exportButtonType = "btn-primary";
	$scope.exportButtonText = "Export";

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

	$scope.export = function () {
		//Do animation for user on export button. Register future animation and reset
		$scope.exportButtonType = "btn-info"; $scope.exportButtonText = "Downloading...";   //downloading
		$timeout(function(){$scope.exportButtonType = "btn-success"; $scope.exportButtonText = "Downloaded"}, 3000); //success
		$timeout(function(){$scope.exportButtonType = "btn-primary"; $scope.exportButtonText = "Export"}, 5000); //reset

		var groups = $scope.model.groups;
		var includeFields = $scope.model.includes;
		var fileOutput = "";
		console.log($scope.model.columns);
		
		for(i = 0; i < $scope.model.includes.length; i++) {
		    fileOutput = fileOutput.concat($scope.model.includes[i]["label"], ",");
		}
		fileOutput = fileOutput.concat("Group\n");

		for (i = 0; i < groups.length; i++) {

			var items = groups[i].items;
			for (j = 0; j < items.length; j++) {
				for (k = 0; k < includeFields.length; k++) {
					if (includeFields[k]["label"] != "$$hashKey") {
						fileOutput = fileOutput.concat(items[j][includeFields[k]["label"]]);
						fileOutput = fileOutput.concat(",");
					}
				}
				fileOutput = fileOutput.concat(groups[i].name);
				fileOutput = fileOutput.concat("\n");
			}
		}
		console.log(fileOutput);
		download(fileOutput, "groups.csv", "text/plain");
	}

	function download(data, strFileName, strMimeType) {

		var self = window, // this script is only for browsers anyway...
			u = "application/octet-stream", // this default mime also triggers iframe downloads
			m = strMimeType || u,
			x = data,
			D = document,
			a = D.createElement("a"),
			z = function (a) {
				return String(a);
			},
			B = (self.Blob || self.MozBlob || self.WebKitBlob || z);
		B = B.call ? B.bind(self) : Blob;
		var fn = strFileName || "download",
			blob,
			fr;


		if (String(this) === "true") { //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
			x = [x, m];
			m = x[0];
			x = x[1];
		}


		//go ahead and download dataURLs right away
		if (String(x).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/)) {
			return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
				navigator.msSaveBlob(d2b(x), fn) :
				saver(x); // everyone else can save dataURLs un-processed
		}//end if dataURL passed?

		blob = x instanceof B ?
			x :
			new B([x], {type: m});


		function d2b(u) {
			var p = u.split(/[:;,]/),
				t = p[1],
				dec = p[2] == "base64" ? atob : decodeURIComponent,
				bin = dec(p.pop()),
				mx = bin.length,
				i = 0,
				uia = new Uint8Array(mx);

			for (i; i < mx; ++i) uia[i] = bin.charCodeAt(i);

			return new B([uia], {type: t});
		}

		function saver(url, winMode) {

			if ('download' in a) { //html5 A[download]
				a.href = url;
				a.setAttribute("download", fn);
				a.innerHTML = "downloading...";
				D.body.appendChild(a);
				setTimeout(function () {
					a.click();
					D.body.removeChild(a);
					if (winMode === true) {
						setTimeout(function () {
							self.URL.revokeObjectURL(a.href);
						}, 250);
					}
				}, 66);
				return true;
			}

			if (typeof safari !== "undefined") { // handle non-a[download] safari as best we can:
				url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, u);
				if (!window.open(url)) { // popup blocked, offer direct download:
					if (confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")) {
						location.href = url;
					}
				}
				return true;
			}

			//do iframe dataURL download (old ch+FF):
			var f = D.createElement("iframe");
			D.body.appendChild(f);

			if (!winMode) { // force a mime that will download:
				url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, u);
			}
			f.src = url;
			setTimeout(function () {
				D.body.removeChild(f);
			}, 333);

		}//end saver


		if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
			return navigator.msSaveBlob(blob, fn);
		}

		if (self.URL) { // simple fast and modern way using Blob and URL:
			saver(self.URL.createObjectURL(blob), true);
		} else {
			// handle non-Blob()+non-URL browsers:
			if (typeof blob === "string" || blob.constructor === z) {
				try {
					return saver("data:" + m + ";base64," + self.btoa(blob));
				} catch (y) {
					return saver("data:" + m + "," + encodeURIComponent(blob));
				}
			}

			// Blob but not URL:
			fr = new FileReader();
			fr.onload = function (e) {
				saver(this.result);
			};
			fr.readAsDataURL(blob);
		}
		return true;
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

