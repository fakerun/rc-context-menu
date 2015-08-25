var demoApp = angular.module('demo', ['rc.contextMenu']);

demoApp.controller("DemoController", [function() {
    var self = this;

    self.firstActionSelected = function() {
        console.log("first action selected");
    };

    self.secondActionSelected = function() {
        console.log("second action selected");
    };

    self.thirdActionSelected = function() {
        console.log("third action selected");
    };
}]);