angular.module('rc.contextMenu', [])
    .directive("rcContextMenuArea", function() {
        return {
            restrict: "A",
            replace: true,
            link: function(scope, element, attrs) {
                var isOpen = false,
                    isAbsolutePosition = isPositionAbsolute(attrs['rc-position']),
                    contextMenu = angular.element(element.children('.rc-context-menu'));

                contextMenu.css('display', isAbsolutePosition ? 'absolute' : 'fixed');

                function isPositionAbsolute(position) {
                    return typeof position != 'undefined' && position === 'absolute';
                }

                function closeContextMenuOnDesktop(event) {
                    if(isOpen && !isRightClick(event))
                        hideContextMenu();
                }

                function isRightClick(event) {
                    if(event.which)
                        return event.which == 3;
                    else if(event.button)
                        return event.button == 2;
                }

                window.addEventListener("click", closeContextMenuOnDesktop, false);

                function toggleContextMenu(event) {
                    if(element[0].contains(event.target)) {
                        isOpen = true;
                        event.preventDefault();
                        event.stopPropagation();

                        var coordinates = getCoordinates(event, isAbsolutePosition);
                        contextMenu.css({visibility: 'visible', left: coordinates.left, top: coordinates.top});
                    } else if(isOpen) {
                        hideContextMenu();
                    }
                }

                function getCoordinates(event, isAbsolutePosition) {
                    if(isAbsolutePosition) {
                        return {
                            left: (event.pageX - element.offset().left) + 'px',
                            top: (event.pageY - element.offset().top) + 'px'
                        };
                    } else {
                        return {
                            left: event.clientX + 'px',
                            top: event.clientY + 'px'
                        };
                    }
                }

                window.addEventListener("contextmenu", toggleContextMenu, false);

                function hideContextMenu() {
                    isOpen = false;
                    contextMenu.css({visibility: 'hidden'});
                }

                scope.$on('$destroy', function () {
                    window.removeEventListener("click", closeContextMenuOnDesktop, false);
                    window.removeEventListener("contextmenu", toggleContextMenu, false);
                });
            }
        }
    })
    .directive("rcContextMenu", function() {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            template: "<div class='rc-context-menu'><ul ng-class='{\"context-menu-disabled\": isDisabled}' ng-transclude></ul></div>",
            scope: {
                isDisabled: "=ngDisabled"
            },
            controller: function($scope) {
                var self = this;
                self.isDisabled = $scope.isDisabled;
            }
        };
    })
    .directive("rcContextMenuTitle", function() {
        return {
            restrict: "E",
            transclude: true,
            replace: true,
            template: "<li class='context-menu-title' ng-transclude></li>"
        }
    })
    .directive("rcContextMenuDivider", function() {
        return {
            restrict: "E",
            replace: true,
            template: "<li class='divider'></li>"
        }
    })
    .directive("rcContextMenuItem", function() {
        return {
            restrict: "E",
            transclude: true,
            replace: true,
            require: "^rcContextMenu",
            scope: {
                isDisabled: "=ngDisabled",
                callback: "&onSelect"
            },
            template: "<li ng-class='{\"disabled\": isDisabled}' ng-click=\"itemWasClicked()\" ng-transclude></li>",
            link: function(scope, element, attrs, contextMenuCtrl) {
                scope.itemWasClicked = function() {
                    if(!scope.isDisabled && !contextMenuCtrl.isDisabled)
                        scope.callback();
                }
            }
        }
    });
