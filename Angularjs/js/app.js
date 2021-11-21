(function() {
  'use strict';

  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', foundItems)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  
  function foundItems() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      }
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowItDown = this;

    narrowItDown.searchTerm = '';
    narrowItDown.found = [];
    narrowItDown.shouldDisplayMessage = false;


    narrowItDown.doSearchTerm = function() {
      if(narrowItDown.searchTerm) {
        MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm)
          .then(checkResponse);
      } else {
        narrowItDown.found = [];
        narrowItDown.shouldDisplayMessage = true;
      }
    };

    narrowItDown.removeItem = function(itemIndex) {
      console.log(itemIndex);
      narrowItDown.found.splice(itemIndex, 1);
    };

    function resetSearch() {
      narrowItDown.shouldDisplayMessage = false;
      narrowItDown.searchTerm = '';
    }

    function checkResponse(response) {
      resetSearch();
      narrowItDown.found = response;
      if(!(narrowItDown.found.length > 0)) {
        narrowItDown.shouldDisplayMessage = true;
      }
    }

  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var menuSearch = this;
    menuSearch.getMatchedMenuItems = function(searchTerm) {
       return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
        }).then(function(result) {
        var allItems = result.data.menu_items;
        var foundItems = [];
        for (var index = 0; index < allItems.length; ++index) {
        if (allItems[index].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
        foundItems.push(allItems[index]);
        }
      }
      return foundItems;
    });
    };
  }
})();