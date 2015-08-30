var demoApp = angular.module('demo', ['rc.contextMenu']);

demoApp.controller("DemoController", [function() {
    var self = this;

    self.firstActionSelected = function(param) {
        console.log("first action selected with " + param);
    };

    self.secondActionSelected = function() {
        console.log("second action selected");
    };

    self.thirdActionSelected = function(param) {
        console.log("third action selected with " + param);
    };
}]);