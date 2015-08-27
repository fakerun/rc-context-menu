angular.module('rc.contextMenu', [])
    .directive("rcContextMenuArea", function() {
        return {
            restrict: "A",
            replace: true,
            link: function(scope, element, attrs) {
                scope.isOpen = false;

                var contextMenu = angular.element(element.children('.rc-context-menu'));

                function closeContextMenuOnDesktop(event) {
                    if(scope.isOpen && !isRightClick(event))
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
                        scope.isOpen = true;
                        event.preventDefault();
                        event.stopPropagation();

                        var left = event.clientX + 'px',
                            top = event.clientY + 'px';
                        console.log(contextMenu);
                        contextMenu.css({visibility: 'visible', left: left, top: top});
                    } else if(scope.isOpen) {
                        hideContextMenu();
                    }
                }

                window.addEventListener("contextmenu", toggleContextMenu, false);

                function hideContextMenu() {
                    scope.isOpen = false;
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
            template: "<div class='rc-context-menu'><ul ng-transclude></ul></div>",
            link: function(scope, element, attrs, contextMenuAreaCtrl) {

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
            template: "<li ng-transclude></li>",
            link: function(scope, element, attrs, contextMenuCtrl) {

            }
        }
    });
