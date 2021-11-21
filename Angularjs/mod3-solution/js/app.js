(function() {
  'use strict';

  angular.module("NarrowItDownApp",[])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
//      templateUrl : 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'found',
      bindToController: true
    }
    return ddo;
  }
  NarrowItDownController.$inject = ["MenuSearchService"]
  function NarrowItDownController(MenuSearchService) {
    var found = this;
    found.searchTerm = "";
    found.list = [];
    found.errorMessage = "";
    found.search = (word) => {
      MenuSearchService.getMatchedMenuItems(word).then((res) => {
        found.list = res;
        if (res.length === 0) {
          found.errorMessage = "Nothing Found!";
        } else {
          found.errorMessage = "";
             }console.log(found.list);
      })
    }; 
    found.removeItem = (index) =>{
      found.list.splice(index, 1);
    }

  }

  MenuSearchService.$inject = ["$http"]
  function MenuSearchService($http) {
    var service = this;
    service.getMatchedMenuItems = (searchTerm) => {
      return $http({
        method : "GET",
        url:("https://davids-restaurant.herokuapp.com/menu_items.json")
      }).then((result) => {
        var foundItem = [];
        if (searchTerm == undefined || searchTerm == null || searchTerm == "") {
          return foundItem;
        }
        var wholeList = result.data.menu_items;
        for (var item of wholeList) {
          if (item.description.includes(searchTerm.toLowerCase())) {
            foundItem.push(item);
          }
        }
        return foundItem;
      });
    };
  }
})()
